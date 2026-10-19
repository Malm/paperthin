const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const cp=require('node:child_process');
const {render}=require('../scripts/build.cjs');
const root=path.resolve(__dirname,'../..');
function fixture(t){
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'paperthin-test-'));
  t.after(()=>fs.rmSync(base,{recursive:true,force:true}));
  for(const p of ['skills','codex/templates','LICENSE','NOTICE'])fs.cpSync(path.join(root,p),path.join(base,p),{recursive:true});
  return base;
}
function mode(base,name,description,explicit=false){
 const dir=path.join(base,'skills/depth',name);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'SKILL.md'),`---\nname: ${name}\ndescription: ${JSON.stringify(description)}\ndisable-model-invocation: ${explicit}\n---\n\nWorkflow for ${name}.\n`);
}
test('additions, removals and renames update the parent and reference set',t=>{
 const b=fixture(t);const first=render(b,'a'.repeat(40));
 mode(b,'new-mode','A new capability.',true);
 fs.rmSync(path.join(b,'skills/depth/re0'),{recursive:true});
 mode(b,'renamed-mode','Replacement workflow.');
 const next=render(b,'b'.repeat(40));const manifest=JSON.parse(next['manifest.json']);
 assert(manifest.skills.some(s=>s.name==='new-mode'&&s.explicitOnly));
 assert(!manifest.skills.some(s=>s.name==='re0'));
 assert(!next['references/re0/workflow.md']);
 assert(next['references/renamed-mode/workflow.md']);
 assert(next['SKILL.md'].toString().includes('A new capability.'));
 assert(next['SKILL.md'].toString().includes('new-mode, '));
 assert.notDeepEqual(next,first);
});
test('description and invocation changes propagate; workflow bytes and resources survive',t=>{
 const b=fixture(t);mode(b,'hate','Changed description with | and Unicode: åäö.',false);
 fs.writeFileSync(path.join(b,'skills/depth/hate/helper.txt'),'resource');
 const out=render(b,'a'.repeat(40));const m=JSON.parse(out['manifest.json']);
 assert.equal(m.skills.find(s=>s.name==='hate').explicitOnly,false);
 assert(out['SKILL.md'].toString().includes('Changed description with | and Unicode: åäö.'));
 assert.deepEqual(out['references/hate/workflow.md'],fs.readFileSync(path.join(b,'skills/depth/hate/SKILL.md')));
 assert.equal(out['references/hate/helper.txt'].toString(),'resource');
 assert.deepEqual(out,render(b,'a'.repeat(40)));
 assert.equal(Object.keys(out).filter(p=>path.basename(p)==='SKILL.md').length,1);
});
test('unsupported metadata fails rather than silently changing semantics',t=>{
 const b=fixture(t);mode(b,'new-mode','Test');
 const p=path.join(b,'skills/depth/new-mode/SKILL.md');
 fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('name: new-mode','name: new-mode\nallowed-tools: shell'));
 assert.throws(()=>render(b,'a'.repeat(40)),/Review new metadata/);
});
test('installer is idempotent and refuses to overwrite local edits',t=>{
 const b=fixture(t);const dest=path.join(b,'install/skills/paperthin');
 const run=()=>cp.execFileSync('python3',[path.join(root,'codex/scripts/install.py'),'--dest',dest],{encoding:'utf8',stdio:'pipe'});
 assert.match(run(),/Installed one/);assert.match(run(),/Already current/);
 fs.appendFileSync(path.join(dest,'SKILL.md'),'\nLocal edits.\n');
 assert.throws(run,/local edits/);
 assert(fs.readFileSync(path.join(dest,'SKILL.md'),'utf8').endsWith('Local edits.\n'));
});
test('installer backs up an intact older package and refreshes it',t=>{
 const b=fixture(t);const dest=path.join(b,'install/skills/paperthin');
 const run=()=>cp.execFileSync('python3',[path.join(root,'codex/scripts/install.py'),'--dest',dest],{encoding:'utf8'});
 run();const old=path.join(dest,'references/retired.txt');fs.writeFileSync(old,'retired content');
 const receipt=path.join(dest,'.paperthin-install.json');const data=JSON.parse(fs.readFileSync(receipt));
 data.files['references/retired.txt']=require('node:crypto').createHash('sha256').update('retired content').digest('hex');
 fs.writeFileSync(receipt,JSON.stringify(data));
 assert.match(run(),/Previous version preserved/);assert(!fs.existsSync(old));
 const backups=path.join(b,'install/skill-backups');
 const saved=fs.readdirSync(backups);assert.equal(saved.length,1);
 assert.equal(fs.readFileSync(path.join(backups,saved[0],'references/retired.txt'),'utf8'),'retired content');
});
