# Maintain the Codex family

This directory is Malm's packaging layer. The user's requested single-skill layout overrides the upstream convention that each workflow installs independently. Do not edit `skills/`, the upstream catalog, or upstream version numbers to change this layer.

When asked to update the underlying skills:

1. Read `README.md` in this directory and `upstream.json`. Use a clean branch and `node codex/scripts/update.cjs`; never reset or overwrite user changes.
2. Resolve upstream merge conflicts preserving both the upstream changes and this distribution's root README/AGENTS introduction. If dependency metadata changed, run `npm ci` before rebuilding. For npm connectivity, proxy, or certificate failures, ask Erik to disable Cloudflare WARP, then retry with `--userconfig=/dev/null`.
3. Run the printed build command with the fetched upstream SHA. The builder regenerates the main description, catalog, invocation flags, workflow references, resources, and manifest. Never hand-edit `paperthin/`.
4. Inspect the source diff since the previous pinned commit and the generated diff. New metadata/layout fails closed; extend the parser deliberately. Check renamed/deleted modes' mentions in other workflows and the custom update override. If the capabilities change beyond the discovery description's scope, revise the description generator. Do not claim semantic correctness from a passing build alone.
5. Run `node --test codex/tests/*.test.cjs`, `node codex/scripts/build.cjs --check`, and `bash scripts/validate-skills.sh`. Review `templates/`, README instructions, and installer compatibility. Keep all tests passing; add meaningful cases for new formats or resources.
6. Include upstream.json, source changes, generated output, and necessary packaging/documentation changes in the same reviewed commit. Explain additions, removals, invocation changes, and any manual adaptation.
7. Publish only within the user's authorization. If asked to update the local installation, use `python3 codex/scripts/install.py` and verify it. Updating GitHub does not update an already installed copy.

An ordinary “update underlying skills” request includes rebuilding the parent skill; never leave its descriptions or links stale. It does not authorize adding hooks, schedules, stars, switching installations to individual skills, or publishing npm packages. Package-only changes do not bump the upstream package.json version or run upstream releases.
