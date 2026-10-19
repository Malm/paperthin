#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const YAML = require('yaml');
const root = path.resolve(__dirname, '../..');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name, 'en')).flatMap(e => {
    const p = path.join(dir,e.name);
    if (e.isSymbolicLink()) throw Error(`Symlink requires review: ${p}`);
    return e.isDirectory() ? walk(p) : [p];
  });
}
function render(base, upstreamCommit) {
  const files = walk(path.join(base,'skills'));
  const skills = files.filter(p=>path.basename(p)==='SKILL.md').map(p=>{
    const relative=path.relative(base,p).split(path.sep).join('/');
    if (!/^skills\/[^/]+\/[^/]+\/SKILL\.md$/.test(relative)) throw Error(`Review new layout: ${relative}`);
    const source=fs.readFileSync(p,'utf8');
    const match=source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) throw Error(`Missing frontmatter: ${relative}`);
    const meta=YAML.parse(match[1]);
    const name=meta.name;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name!==path.basename(path.dirname(p))) throw Error(`Invalid name: ${relative}`);
    if (typeof meta.description!=='string' || !meta.description.trim()) throw Error(`Missing description: ${name}`);
    if (meta['disable-model-invocation']!==undefined && typeof meta['disable-model-invocation']!=='boolean') throw Error(`Invalid invocation policy: ${name}`);
    const unknown=Object.keys(meta).filter(k=>!['name','description','disable-model-invocation'].includes(k));
    if (unknown.length) throw Error(`Review new metadata for ${name}: ${unknown.join(', ')}`);
    return {name, description:meta.description, explicitOnly:meta['disable-model-invocation']===true, source:relative, sha256:hash(source)};
  }).sort((a,b)=>a.name.localeCompare(b.name,'en'));
  if (!skills.length || new Set(skills.map(s=>s.name)).size!==skills.length) throw Error('Empty or duplicate catalog');
  const outputs={};
  const put=(p,data)=>outputs[p]=Buffer.from(data);
  for (const s of skills) {
    const dir=path.dirname(path.join(base,s.source));
    for (const f of walk(dir)) {
      const rel=path.relative(dir,f).split(path.sep).join('/');
      put(`references/${s.name}/${rel==='SKILL.md'?'workflow.md':rel}`,fs.readFileSync(f));
    }
  }
  const template=fs.readFileSync(path.join(base,'codex/templates/SKILL.md'),'utf8');
  const description='Use Paperthin workflows for artifact cleanup, factual verification, critical review, and iteration learning. Select a relevant workflow for the requested task; explicit-only modes require a user request. Available modes: '+skills.map(s=>s.name).join(', ')+'.';
  if(description.length>1024) throw Error('Discovery description exceeds 1024 characters; revise its generator.');
  const catalog=skills.map(s=>`### ${s.name}\n\nInvocation: ${s.explicitOnly?'explicit user request only':'automatic when relevant, or explicit request'}.\n\n${s.description}\n\nRead [${s.name}](references/${s.name}/workflow.md).${s.name==='re0-upgrade'?' **For this distribution, use [the fork update workflow](references/update.md) instead of the upstream installer.**':''}`).join('\n\n');
  put('SKILL.md',template.replace('{{DESCRIPTION}}',JSON.stringify(description)).replace('{{COUNT}}',String(skills.length)).replace('{{CATALOG}}',catalog));
  put('references/update.md',fs.readFileSync(path.join(base,'codex/templates/update.md')));
  put('LICENSE',fs.readFileSync(path.join(base,'LICENSE')));
  put('NOTICE',fs.readFileSync(path.join(base,'NOTICE')));
  const sourceFiles={};
  for(const f of files) sourceFiles[path.relative(base,f).split(path.sep).join('/')]=hash(fs.readFileSync(f));
  put('manifest.json',JSON.stringify({repository:'LilMGenius/paperthin',upstreamCommit,skills,sourceFiles},null,2)+'\n');
  return outputs;
}
function build({base=root,check=false,commit}={}) {
  const dest=path.join(base,'codex/paperthin');
  const lockPath=path.join(base,'codex/upstream.json');
  const old=JSON.parse(fs.readFileSync(lockPath,'utf8'));
  const upstreamCommit=commit||old.commit;
  if(!/^[a-f0-9]{40}$/.test(upstreamCommit)) throw Error('Expected a pinned full upstream commit SHA');
  // Ensure generated provenance refers to the actual source, including deletions/additions.
  const upstreamFiles=cp.execFileSync('git',['ls-tree','-r','--name-only',upstreamCommit,'--','skills'],{cwd:base,encoding:'utf8'}).trim().split('\n').filter(Boolean).sort();
  const localFiles=walk(path.join(base,'skills')).map(f=>path.relative(base,f).split(path.sep).join('/')).sort();
  if(JSON.stringify(upstreamFiles)!==JSON.stringify(localFiles)) throw Error('Source tree differs from pinned upstream. Use update workflow.');
  for(const file of localFiles) {
    const original=cp.execFileSync('git',['show',`${upstreamCommit}:${file}`],{cwd:base});
    if(!original.equals(fs.readFileSync(path.join(base,file)))) throw Error(`Source differs from upstream: ${file}`);
  }
  const outputs=render(base,upstreamCommit);
  if(check) {
    const actual=fs.existsSync(dest)?walk(dest).map(p=>path.relative(dest,p).split(path.sep).join('/')).sort():[];
    if(JSON.stringify(actual)!==JSON.stringify(Object.keys(outputs).sort())) throw Error('Generated file set is stale; run build.');
    for(const [p,data] of Object.entries(outputs)) if(!data.equals(fs.readFileSync(path.join(dest,p)))) throw Error(`Generated file is stale: ${p}`);
    console.log('Generated package is current.'); return;
  }
  const previous=fs.existsSync(path.join(dest,'manifest.json'))?JSON.parse(fs.readFileSync(path.join(dest,'manifest.json'))):{skills:[]};
  const next=JSON.parse(outputs['manifest.json']);
  const before=new Map(previous.skills.map(s=>[s.name,s]));
  const after=new Map(next.skills.map(s=>[s.name,s]));
  console.log(JSON.stringify({added:next.skills.filter(s=>!before.has(s.name)).map(s=>s.name),removed:previous.skills.filter(s=>!after.has(s.name)).map(s=>s.name),changed:next.skills.filter(s=>before.has(s.name)&&s.sha256!==before.get(s.name).sha256).map(s=>s.name)},null,2));
  const stage=fs.mkdtempSync(path.join(base,'codex/.build-'));
  try {
    for(const [p,data] of Object.entries(outputs)){fs.mkdirSync(path.dirname(path.join(stage,p)),{recursive:true});fs.writeFileSync(path.join(stage,p),data);}
    fs.rmSync(dest,{recursive:true,force:true});fs.renameSync(stage,dest);
    fs.writeFileSync(lockPath,JSON.stringify({...old,commit:upstreamCommit},null,2)+'\n');
  } finally {fs.rmSync(stage,{recursive:true,force:true});}
  console.log(`Built one paperthin skill with ${next.skills.length} modes.`);
}
if(require.main===module) {
  try { const args=process.argv.slice(2); const i=args.indexOf('--upstream-commit'); build({check:args.includes('--check'),commit:i<0?undefined:args[i+1]}); }
  catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={render,build};
