#!/usr/bin/env python3
"""Install one generated skill; preserve edited installs and back up replacements."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import tempfile
import uuid

SOURCE = Path(__file__).resolve().parents[1] / 'paperthin'
RECEIPT = '.paperthin-install.json'

def fingerprints(directory):
    result = {}
    for p in sorted(directory.rglob('*')):
        if p.is_symlink():
            raise ValueError(f'Symlink requires manual review: {p}')
        if p.is_file() and p.relative_to(directory).as_posix() != RECEIPT:
            result[p.relative_to(directory).as_posix()] = hashlib.sha256(p.read_bytes()).hexdigest()
    return result

def install(dest):
    if dest.is_symlink():
        raise ValueError(f'Existing install is a symlink; preserve it and reconcile manually: {dest}')
    wanted = fingerprints(SOURCE)
    if 'SKILL.md' not in wanted or 'manifest.json' not in wanted:
        raise ValueError('Generated package is missing; build it first.')
    if dest.exists():
        receipt = dest / RECEIPT
        if not receipt.is_file():
            raise ValueError('Existing skill is not managed by this installer; no files changed.')
        recorded = json.loads(receipt.read_text())
        actual = fingerprints(dest)
        if actual != recorded['files']:
            raise ValueError('Installed skill has local edits; preserve and reconcile them before updating. No files changed.')
        if actual == wanted:
            print(f'Already current: {dest}')
            return
    dest.parent.mkdir(parents=True, exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix='.paperthin-stage-', dir=dest.parent.parent))
    backup = None
    try:
        shutil.copytree(SOURCE, stage, dirs_exist_ok=True)
        (stage / RECEIPT).write_text(json.dumps({'repository': 'Malm/paperthin', 'files': wanted}, indent=2) + '\n')
        if dest.exists():
            backups = dest.parent.parent / 'skill-backups'
            backups.mkdir(exist_ok=True)
            backup = backups / ('paperthin-' + uuid.uuid4().hex)
            dest.rename(backup)
        try:
            stage.rename(dest)
        except Exception:
            if backup is not None:
                backup.rename(dest)
            raise
        if fingerprints(dest) != wanted:
            raise ValueError('Post-install verification failed.')
        print(f'Installed one paperthin skill: {dest}')
        if backup:
            print(f'Previous version preserved at: {backup}')
    finally:
        if stage.exists():
            shutil.rmtree(stage)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dest', type=Path, default=Path(os.environ.get('CODEX_HOME', Path.home() / '.codex')) / 'skills' / 'paperthin')
    args = parser.parse_args()
    try:
        install(args.dest.expanduser().absolute())
    except (ValueError, OSError, KeyError) as error:
        parser.exit(1, f'{error}\n')
