# Paperthin for Codex: one skill, many workflows

This is Malm's single-skill packaging of [LilMGenius/paperthin](https://github.com/LilMGenius/paperthin). Codex discovers one `paperthin` skill; it reads the relevant workflow only when needed. The upstream Markdown stays unchanged in `skills/`. Generated references are named `workflow.md`, so they do not become additional standalone skills.

Use `$paperthin hate` to challenge a plan, `$paperthin factchk` to verify claims, or describe the task in plain language. Automatic selection remains available for appropriate modes; explicitly invoked modes retain their restrictions. The generated [catalog](paperthin/SKILL.md) contains current descriptions and invocation rules.

## Install

Clone **Malm/paperthin**, then run:

```sh
python3 codex/scripts/install.py
```

This installs only `codex/paperthin` into `$CODEX_HOME/skills/paperthin` (default `~/.codex/skills/paperthin`). No npm dependencies are needed to install the committed package. A matching existing installation is a no-op. Updates preserve a backup; local edits or an unrelated existing skill stop the installer. The skill is available on the next turn.

Do not use the upstream README's bare multi-skill install command for this distribution.

## Ask an agent to update it

> Update the underlying Paperthin workflows from upstream, regenerate the parent skill and descriptions, run the checks, and show me the changes.

Add “publish to my fork and refresh my local installation” if those actions are wanted too. [AGENTS.md](AGENTS.md) defines the complete agent workflow.

## Manual update

Requires Git, Node.js 20 or newer, and npm. The upstream full CI checks also require Bash 4+ (macOS ships Bash 3; the GitHub Linux runner supplies a compatible version). Start with a clean checkout of this fork, on a new update branch:

```sh
git switch -c update-paperthin
node codex/scripts/update.cjs
npm ci
# Run the build command printed by update.cjs, including --upstream-commit <SHA>.
node --test codex/tests/*.test.cjs
node codex/scripts/build.cjs --check
bash scripts/validate-skills.sh
git diff
```

The update script fetches the original repository and starts a merge without committing. If conflicts occur, resolve them, obtain the fetched SHA with `git rev-parse upstream/main`, then run `node codex/scripts/build.cjs --upstream-commit <SHA>`. To abandon a pending merge, use `git merge --abort`.

The build updates the parent discovery description's mode list, the full descriptions and invocation rules in its catalog, copied workflows/resources, and a manifest of source hashes. Added modes appear automatically; deleted modes disappear; renames appear as a removal and an addition. Unsupported layout or metadata stops the build for an explicit adaptation instead of silently discarding it.

Review the original source diff from the previous commit recorded in `codex/upstream.json` to the new upstream commit, plus both staged and unstaged changes (`git diff --cached` and `git diff`). Pay special attention to changed instructions, cross-workflow references, and new capabilities requiring broader discovery wording. Commit the merged source and generated package together, publish the branch or main as authorized, then run the installer again if the local copy should be refreshed.

There are no automatic fetches, schedules, or install hooks. CI checks consistency and tests update behavior; it does not approve new upstream instructions. README/AGENTS introduction conflicts may need a manual merge. Upstream release/publishing workflows are not the release mechanism for this Codex package; do not push upstream release tags to publish it.

## Layout and maintenance

- `skills/`: original upstream sources; keep unchanged.
- `codex/templates/`: parent routing and the replacement upgrade workflow.
- `codex/scripts/`: deterministic build, upstream merge preparation, and local installation.
- `codex/upstream.json`: pinned source commit.
- `codex/paperthin/`: complete installable, generated skill, including source/license provenance.
- `codex/tests/`: checks additions, removals, renames, description and invocation changes, and installer behavior.

Edit templates or the generator to customize the family, then run `node codex/scripts/build.cjs`. Run `--check` to verify the committed package has not drifted. A new upstream metadata field or file layout requires a reviewed generator change.

## Attribution

Original workflows: LilMGenius/paperthin, MIT. Packaging: Malm, MIT. The original [LICENSE](../LICENSE) and [NOTICE](../NOTICE) are retained and included in the installed package. This is an independently maintained fork, not an official upstream Codex distribution.
