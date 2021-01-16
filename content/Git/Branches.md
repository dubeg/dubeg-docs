---
date: 2018-09-27
title: Branches
menu:
    sidebar:
        parent: Git
---

Branches are stored locally as single SHA1 sums, each representing a commit.


## Types
- Local
    + Location: `.git/refs/heads/`
- Remote
    + Location: `.git/refs/remotes/`
    + Alias: remote-tracking branch.
    + Remotes are nicknames for external repositories, synonymous with an URL or path to a local directory.
    + The names of remote branches are made up of the name of a "remote" followed by "/" and then the name of a branch in that remote repository. 
    + Users setup their own remotes manually, but `git clone` sets up the remote `origin` by default.

## Fetching
The safe way to change a remote-tracking branch is to use git fetch. It isn't possible to work on remote-tracking branches directly. You can't commit changes to it, but you can fetch commits from its source.

Steps

- Update a remote-tracking branch with `git fetch`.
- Create new local branches based on them.
- OR
- Merge from them into the current branch.

## Merging
Fast-forward
   
+ Implies no new commits in your local branch.
