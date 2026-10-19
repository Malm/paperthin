#!/usr/bin/env node
const fs=require('node:fs');
const cp=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const run=(args)=>cp.execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
try {
  if(run(['status','--porcelain'])) throw Error('Commit or preserve local changes before updating.');
  const lock=JSON.parse(fs.readFileSync(path.join(root,'codex/upstream.json'),'utf8'));
  const remotes=run(['remote']).split('\n');
  if(!remotes.includes('upstream')) run(['remote','add','upstream',lock.repository]);
  if(run(['remote','get-url','upstream'])!==lock.repository) throw Error('Unexpected upstream URL; inspect it before fetching.');
  run(['fetch','upstream',lock.branch]);
  const commit=run(['rev-parse',`refs/remotes/upstream/${lock.branch}`]);
  if(commit===lock.commit){require('./build.cjs').build({check:true});console.log('Already current.');process.exit(0);}
  // A pending merge lets the agent review generated output before committing.
  run(['merge','--no-commit','--no-ff',commit]);
  console.log(`Upstream merged at ${commit}. Run npm ci, then:`);
  console.log(`node codex/scripts/build.cjs --upstream-commit ${commit}`);
  console.log('Follow codex/README.md: test, review, then commit the merge and generated output together.');
} catch(e){console.error(e.message);console.error('If a merge is pending, resolve it and continue per codex/README.md, or use git merge --abort to abandon it.');process.exitCode=1;}
