# Update Malm's single-skill distribution

Repository: https://github.com/Malm/paperthin. The installable directory is `codex/paperthin`. The source repository, not this installed copy, owns the build tools.

1. Locate an existing Malm/paperthin checkout or clone it into the user's chosen workspace. Inspect its root `AGENTS.md` and `codex/AGENTS.md`. Do not edit the installed generated files directly.
2. Follow `codex/README.md` to fetch and merge upstream on a clean update branch, rebuild, test, and review the source and generated changes. User authorization to update covers this local work; publishing must follow the user's requested scope.
3. Review new, removed, renamed, and behavior-changed workflows, including invocation policy. The generator updates names, descriptions, references, and source hashes together. A rename appears as one removal and one addition; review references by old name and update routing if necessary.
4. Commit the complete tested update and publish when authorized. Refresh only the existing `paperthin` installation with `python3 codex/scripts/install.py` from that checkout. If its current contents have local edits, the installer stops; preserve and reconcile them rather than force overwriting.
5. Report the upstream commit, modes changed, validation, repository publication status, and installation status separately. The refreshed skill is available on the next turn.

Do not run the upstream `re0-upgrade` installer: it would replace this family layout with separate skills. This workflow creates no background jobs or hooks. Source updates still require review; mechanical consistency is not a behavioral safety guarantee.
