---
name: paperthin
description: {{DESCRIPTION}}
---

# Paperthin

One Codex skill with {{COUNT}} progressively loaded workflows from LilMGenius/paperthin, packaged by Malm. The catalog below is generated from the pinned upstream sources.

## Select a workflow

Use the named mode when the user requests it (for example, `$paperthin hate` or “use Paperthin to fact-check this”). Otherwise choose only an automatic mode whose description matches the actual task. Read only that mode's reference, not the whole family. If the user invokes Paperthin without a task, briefly explain the relevant options and ask what to work on.

Preserve each mode's invocation restriction below. Explicit-only modes require the user's deliberate request; a reference to another mode is not that authorization. When a workflow calls another available mode, resolve its name through this catalog and load its reference as needed. Do not recursively repeat a check that has already completed for unchanged input.

The copied workflow files retain their upstream frontmatter for provenance; they are references, not separately installed skills. Their requirements apply to the selected workflow, not to unrelated tasks. Repository-specific release and iteration workflows use the target repository's actual conventions; do not assume it uses Paperthin's npm release process.

## Updating this distribution

For `re0-upgrade` or a request to update Paperthin, read [references/update.md](references/update.md). This is a deliberate packaging override: do not run the original multi-skill installer, install session hooks, or switch to the upstream distribution. The original upgrade workflow is retained only as source material.

## Generated catalog

{{CATALOG}}
