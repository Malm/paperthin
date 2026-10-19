---
name: paperthin
description: "Use Paperthin workflows for artifact cleanup, factual verification, critical review, and iteration learning. Select a relevant workflow for the requested task; explicit-only modes require a user request. Available modes: aim, autobahn, catchup, debloat, dedash, detool, factchk, feynman, hate, macrothink, mandela, modelchk, nba, prism, re0, re0-git, re0-loop, re0-memo, re0-merge, re0-plan, re0-release, re0-upgrade, re0-work, readchk, reorder, shower, sip, ssotize."
---

# Paperthin

One Codex skill with 28 progressively loaded workflows from LilMGenius/paperthin, packaged by Malm. The catalog below is generated from the pinned upstream sources.

## Select a workflow

Use the named mode when the user requests it (for example, `$paperthin hate` or “use Paperthin to fact-check this”). Otherwise choose only an automatic mode whose description matches the actual task. Read only that mode's reference, not the whole family. If the user invokes Paperthin without a task, briefly explain the relevant options and ask what to work on.

Preserve each mode's invocation restriction below. Explicit-only modes require the user's deliberate request; a reference to another mode is not that authorization. When a workflow calls another available mode, resolve its name through this catalog and load its reference as needed. Do not recursively repeat a check that has already completed for unchanged input.

The copied workflow files retain their upstream frontmatter for provenance; they are references, not separately installed skills. Their requirements apply to the selected workflow, not to unrelated tasks. Repository-specific release and iteration workflows use the target repository's actual conventions; do not assume it uses Paperthin's npm release process.

## Updating this distribution

For `re0-upgrade` or a request to update Paperthin, read [references/update.md](references/update.md). This is a deliberate packaging override: do not run the original multi-skill installer, install session hooks, or switch to the upstream distribution. The original upgrade workflow is retained only as source material.

## Generated catalog

### aim

Invocation: automatic when relevant, or explicit request.

When data lands with a thin ask — files, a repo, a paste, a chat scrollback — read it and propose what the user is trying to do with it, as a proposal to confirm rather than a question to answer. Use the moment material arrives without a fully-formed ask, or when the ask reads thinner than the data suggests.

Read [aim](references/aim/workflow.md).

### autobahn

Invocation: automatic when relevant, or explicit request.

Carve guardrail-adjacent items out of scope with safe alternatives before risk-adjacent work starts, then run the safe remainder at full strength in a fresh subagent that only ever sees the carved prompt, never the risky input. Use when a task includes stealth, scraping, privacy, IP, policy, licensing, security, or other safety-adjacent material that could be silently dropped, over-elaborated, or needlessly diluted. Fires on the impulse, not only the topic: the moment you notice yourself about to hedge, soften, silently skip, or brace for a refusal, carve before you execute.

Read [autobahn](references/autobahn/workflow.md).

### catchup

Invocation: automatic when relevant, or explicit request.

Rebuild the human's lost context on a project from live state, in plain language: what needs them, what changed, what new words mean. Use when the human returns after a gap, says they can't follow the project anymore, asks what happened or what a term means, or before deciding what to do next when their mental model is stale. Read-only; it briefs, it does not act.

Read [catchup](references/catchup/workflow.md).

### debloat

Invocation: explicit user request only.

Compress an artifact that has accreted into bloat — padding, over-qualification, fused sentences, walls of enumeration, adjacent restatement — down to its load-bearing density, meaning preserved. Use when prose is correct and current but has grown verbose or patched-over and you want it tight without a full rewrite.

Read [debloat](references/debloat/workflow.md).

### dedash

Invocation: explicit user request only.

Remove em-dashes and the dashes standing in for them from a user-owned scope, reading each occurrence in context and choosing the punctuation or wording that fits.

Read [dedash](references/dedash/workflow.md).

### detool

Invocation: automatic when relevant, or explicit request.

Make durable artifacts portable by replacing incidental stack, vendor, model, CLI, path, quota, or harness nouns with the mechanism they mean, while keeping provenance, runbooks, and tool-subject claims concrete.

Read [detool](references/detool/workflow.md).

### factchk

Invocation: automatic when relevant, or explicit request.

Verify reality-grounded claims against external sources in both directions before they ship — could the 'absurd' be real, could the 'obvious' be false or long-established? Use whenever an artifact, or the sentence you are about to write, asserts something as plausible, realistic, absurd, novel, or impossible from intuition rather than a checked source; before relying on a factual claim in prose, a design rationale, a research claim, or a plan. Fires on metacognitive doubt — when you can't actually know, verify instead of trusting the feeling. Scans read-only, then fixes the clear errors or flags the judgment calls; leaves deliberate fiction alone.

Read [factchk](references/factchk/workflow.md).

### feynman

Invocation: explicit user request only.

Press a decision you just made until you can explain it to a skeptic in your own words, or surface the gap where you can't. The Feynman test aimed at a choice: understanding is cheapest to fake the moment after you decide, so a fresh critic presses for what you can't actually explain. Use right after picking an option, especially one an agent laid out without arguing for.

Read [feynman](references/feynman/workflow.md).

### hate

Invocation: explicit user request only.

Attack a plan, design, or argument like you want it to fail before you commit real effort — return the single load-bearing objection and the cheapest experiment that would prove it matters, not a checklist. User-invoked on purpose: a hate-it reflex always in the agent's reach would bias it toward demolition. Weighs many failure axes but owns the synthesis to one root.

Read [hate](references/hate/workflow.md).

### macrothink

Invocation: explicit user request only.

User-invoked read-only pass for checking whether the current direction is tunnel-visioned: strip the session's bait, fan out 2 to 5 same-model fresh reads, and report divergence first without treating convergence as proof.

Read [macrothink](references/macrothink/workflow.md).

### mandela

Invocation: automatic when relevant, or explicit request.

Audit any eval, metric, experiment, or benchmark for leakage — does external ground-truth enter independently, or are the model, scorer, and designer just confirming a result no outside truth ever produced? Use before trusting any 'how we'll know it worked' — an A/B, a holdout, a score, a validation — and whenever a result feels too clean or self-confirming. Walks an 8-pattern leakage taxonomy and returns only the patterns that fire, each with an independence fix. Read-only.

Read [mandela](references/mandela/workflow.md).

### modelchk

Invocation: automatic when relevant, or explicit request.

Size a task's run before spending it: the cheapest sufficient capability tier (fast, standard, frontier) and the reasoning effort within it, on a neutral scale that binds to whatever levels the model exposes. Use when work seems over- or under-powered, costly, ambiguous, or high-risk, or asks which model class and how much thinking is enough.

Read [modelchk](references/modelchk/workflow.md).

### nba

Invocation: automatic when relevant, or explicit request.

Read the live cycle state and return the single highest-leverage next best action, not a menu. Use when a project is between phases, the author asks what to do next, too many valid threads are open, or the work needs re-entry into frame, build, drive, re0-memo, hate, re0-work, or ship.

Read [nba](references/nba/workflow.md).

### prism

Invocation: explicit user request only.

Split one artifact — a claim, plan, or file — across 2 to 5 independent lenses, one per genuinely distinct failure mode (correctness, security, readability, cost, adversarial-user), and return their convergence: where they agree, where they disagree, and the single next question that resolves the disagreement. Use when one reviewer isn't enough because the failure modes are heterogeneous, or a claim looks strong to its author and needs cross-lens pressure before it ships.

Read [prism](references/prism/workflow.md).

### re0

Invocation: automatic when relevant, or explicit request.

Refresh an existing artifact into the current best v0. Use when the user asks to clean up, sync up, dedupe, de-noise, smooth, rewrite, or update an artifact after iteration; when nearby artifacts may have drifted; or when changes in one place should be reflected across related artifacts while keeping the result minimal.

Read [re0](references/re0/workflow.md).

### re0-git

Invocation: explicit user request only.

Rewrite a finished commit's message into a clean, handoff-ready form in your own log style, so `git log` alone tells the story. User-invoked: run it after a commit.

Read [re0-git](references/re0-git/workflow.md).

### re0-loop

Invocation: automatic when relevant, or explicit request.

Run repeated build -> QA -> re0-memo -> re0-work cycles while preserving learning and letting code die. Use for long agentic projects where progress must be measured by quality-cleared templates, reusable modules, and eliminated anti-patterns rather than hours spent or features accumulated.

Read [re0-loop](references/re0-loop/workflow.md).

### re0-memo

Invocation: automatic when relevant, or explicit request.

Turn a finished, failed, or disappointing work cycle into portable lessons, anti-patterns, quality gates, and next-cycle vocabulary. Use after a build, QA pass, demo, user complaint, or abandoned attempt when the useful output is what the next pass must learn rather than the code itself.

Read [re0-memo](references/re0-memo/workflow.md).

### re0-merge

Invocation: explicit user request only.

Review and land an external contribution the way this suite does: gate it against the thesis, land it with the author's credit intact, complete a new skill rather than merging it raw, then approve, credit, and explain before closing. Use when reviewing a pull request, as any collaborator or maintainer, not only the author.

Read [re0-merge](references/re0-merge/workflow.md).

### re0-plan

Invocation: explicit user request only.

Open a paperthin iteration's casebook before re0-loop's first turn — seeded with real content the moment the folder exists, never an empty directory. User-invoked, paperthin-only: assumes the full skill package installed. Run when opening a new build cycle in this repo.

Read [re0-plan](references/re0-plan/workflow.md).

### re0-release

Invocation: explicit user request only.

Walk a pending change through this repo's shipping and releasing checklist end to end, then tag and publish once confirmed. User-invoked: run it when you've decided to ship.

Read [re0-release](references/re0-release/workflow.md).

### re0-upgrade

Invocation: explicit user request only.

Bring your installed paperthin skills up to the full current catalog in one step: retire what's been renamed, add every skill you don't have yet, and refresh the rest, all shown and confirmed before anything changes.

Read [re0-upgrade](references/re0-upgrade/workflow.md). **For this distribution, use [the fork update workflow](references/update.md) instead of the upstream installer.**

### re0-work

Invocation: automatic when relevant, or explicit request.

Restart a project or artifact from v0 while preserving only proven lessons, contracts, gates, vocabulary, real-surface tests, and negative corpus. Use when the foundation is wrong, accumulated code is misleading progress, or a new pass should learn from the old one without inheriting its accidental architecture.

Read [re0-work](references/re0-work/workflow.md).

### readchk

Invocation: automatic when relevant, or explicit request.

Verify the model's understanding of a user's instruction before spending non-trivial work. Use when a request is long, bundled, high-stakes, hard to undo, or has ambiguous scope or referents such as this, that, it, the other one, whatever is cleaner, or whichever order makes sense. Restate internally, cross-check against available context, proceed silently when resolved, and surface only a genuine surviving fork.

Read [readchk](references/readchk/workflow.md).

### reorder

Invocation: explicit user request only.

Realign a listing whose order has gone arbitrary — a list, table, catalog, sections, an enum — into a logical sequence under one stated principle. Move items only: nothing is reworded, added, or removed. Use when the order no longer helps a reader follow the set.

Read [reorder](references/reorder/workflow.md).

### shower

Invocation: automatic when relevant, or explicit request.

Cold-read the artifact you're focused on from a fresh, zero-context sub-session to confirm it stands on its own — a shower-thought reset for accumulated session bias. Use when a long session has worn away your fresh eyes and you can no longer tell whether the artifact in focus is clear to someone with no prior context; before a handoff, publish, or merge; or when you want a clean-room comprehension smoke test. Spawns a separate context-free reviewer; it diagnoses, it does not fix.

Read [shower](references/shower/workflow.md).

### sip

Invocation: automatic when relevant, or explicit request.

After you create or change an artifact or skill, taste-test it with our own skills instead of trusting your in-session judgment — recursive self-improvement, made automatic. Use right after writing or editing anything, before calling it done, committing, or handing it off.

Read [sip](references/sip/workflow.md).

### ssotize

Invocation: automatic when relevant, or explicit request.

Audit and consolidate a fact that's scattered across places into one canonical source, after approval, and replace the rest with references. Use when asked to find duplication, check consistency, locate the source of truth, deduplicate, consolidate, unify, or establish SSOT across artifacts or platforms. Starts read-only, reports the map and plan, then mutates only after explicit approval.

Read [ssotize](references/ssotize/workflow.md).
