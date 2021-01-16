---
date: 2018-09-27
title: Concepts
menu:
    sidebar:
        parent: Git
        identifier: git-docs
---


- Snapshots
    + Not differences/deltas.
    + Conceptually, each commit contains a copy of all the files it includes. 
    + Technically, however, a few tricks are employed to avoid wasting space when a file doesn't change from one commit to another.

- States
    + Modified
        - Modified, but not committed or staged.
    + Staged
        + Modified and marked to go into the next commit snapshot.
        + If a file is modified after being staged, it will need to be staged again if the new modifications need to be committed.
    + Committed
        + Stored in the local database.


## Storage locations
- Git directory
    + `/.git/`
    + Directory in which Git stores metadata and its object database for the project.

- Working tree
    + Single checkout of one version of the project. The files of the tree are pulled out of the compressed database from the `.git` dir, and placed on disk for use.

- Staging area
    + Alias: `index`
    + Generally contained in the `.git` directory. 
    + Stores information about what will go into the next commit. 


## Workflow
1. Modify the files in the working directory.
2. Stage the files, adding snapshots of them in the staging area.
3. Commit the changes, which takes the files as they are in the staging area, and stores them as one snapshot in the local database (in the Git directory).

Notes

- If a version of a file is in the Git directory, it's considered committed.
- If a file has been modified and added to the staging area, it's staged.
- If a file has been modified but not staged, it is modified.


Object types

- blob   : each file added to the repo is turned into a blob.
- tree   : each directory is turned into a tree object.
- commit : snapshot of your working tree at a point in time.
- tag    : 


## Clone
Get a copy of an existing repository.
```
	git clone <URL>
	git clone <URL> <projectName>
```
The command `git clone` copies to a local directory the entirety of the repository that the server has. The full history of the repository is included. It also pulls out a working copy of the latest commit on your disk.

Supported protocols

- HTTPS
- `git://`
- SSH 
    - Ex: `user@server:path/to/repo.git`


## Adding
Each time your repository reaches a state you want to record, stage and commit your changes. 

Each file in the working directory can be either 'tracked', or 'untracked'. Tracked files are files that were in the last snapshot; they can be unmodified, modified or staged. Untracked files are files in the working directory that were not in the last snapshot and are not in the staging area.

If a file that was previously staged is changed again, it will need to be re-staged to add the new changes to the staging area.


## Removing
To remove a file from Git, it has to be removed from the tracked files; more accurately, it has to be removed from the staging area, and then committed. The command `git rm` does that, and also removes it from the working directory, so it isn't shown as an untracked file afterward.

If the file is simply removed from the working directory, it shows up under the "Changed but not updated" area of `git status` output. Use the rm command.

If the file has been modified and is already in the staging area, the removal must be forced: `git rm -f <file>`. This is a safety feature to prevent accidental removal of data that hasnt yet been recorded in a snapshot, and therefore cant be recovered from Git.

Another usecase is to keep the file in the working directory, but remove it from the staging area. In other words, keep the file, but tell Git to stop tracking it.


## Moving
Git doesnt explicitly track file movement. If you rename a file, no metadata is stored in Git that tells it the file was renamed. However, Git can figure it out after the fact. 

Ex: the command `git mv` is equivalent to:  
1. `mv`
1. `git rm` 
1. `git add`. 
 
Git figures out its a rename implicitly, so no worries. `git mv` is only a convenient command, sugar added for the user, not for Git.


## History
After creating several commits, or after cloning an existing repository, it is probably interesting to look back to see what has happened. `git log` is the main tool to do this.


## Tips
- Use `\*`, because Git does its own expansion, and `*` may be resolved by the shell without you expecting it (unless you escape it).
- Git doesn't store empty folders. Make sure to commit a file in it.
- Delete remote branch: git push origin --delete <branchName>
- Commit messages
  + Use present tense: makes them read like actions on the repository.


## Undoing
At any stage, it might be necessary to undo something. Warning: it isnt always possible to undo undoing. 

Ex: commit too early, and possible forget to add some files or mess up the commit message. If you want to try that commit again, you can do..
```
	git commit --amend
```
This command takes the staging area, and uses it for the commit. If no changes were made since the last commit, then the snapshot will look exactly the same, except potentially the commit message.

Ex: forgot to stage a file.
```
	git commit -m "msg"  # Oops
	git add <file>
	git commit --amend
```
The amend commit completely replaces the first, as if the first never existed.


## Unstaging
Ex: you've changed two (2) files, and want to commit them as 2 separate changes, but you typed `git add *` and staged them both. The `git status` reminds you how to proceed.
```
	git reset HEAD <file>
```

N:
The `git reset` can be dangerous with `--hard`. It also touches the working directory. However, calling it without options is safe, as it only touches the staging area.


## Unmodifying
What if changes made to a file aren't wanted anymore. To revert it back to what it looked like when it was last committed, do the following..
```
	git checkout -- <file>
```

N:
The `git checkout -- <file>` is again a dangerous command. Any changes made to the file are gone. Don't use this command unless you have complete knowledge over what changes were made.




## Undo local changes

- Discard changes to file: `git checkout -- <file>`
- Discard changes to all: `git reset --hard`
- Discard changes but save:  `git stash`



## Pull Request (PR)
1. Fork repository.
2. Edit files.
3. Commit and push to fork.
4. Create Pull Request.

Note:
When creating a Pull Request, your commits added to your fork will be added automatically
to your PR. Afterward, adding new commits will also add them to your PR.


If upstream updates their master before your PR is merged, update your fork with upstream:

1. Fetch upstream commits.
2. Replay your commits on top of upstream's master. 
3. Update your fork to update your PR.
```
git fetch upstream
git rebase -i upstream/master
git push origin master -f 
```


If you receive feedback and needs to make some changes:

1. Edit files.
2. Add new commit, or, update last commit.
3. Update fork.
```
git commit -m
git commit --amend
git push origin master -f
```




## Configuration
```
git config --list
git config --global user.name "gdube"
git config --global user.email gdube@int.com
git config --global core.editor c:\path\to\SublimeText

# Suppress "warning: LF will be replaced with CRLF"
git config --global advice.statusHints false

# Suppress "how to stage/unstage/add" hints given by git status
git config --global core.safecrlf false    
```



## List filetypes of staged files
```
git diff --name-only --cached | foreach { $_.split(".")[1] } | select -unique
```




## Clean ignored/untracked files
```
git clean -xdn     # View files/dir to remove
git clean -xdf     # Remove ignored files/dir
```





## Working with remotes.
http://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes


## Tagging
http://git-scm.com/book/en/v2/Git-Basics-Tagging


## Aliases
http://git-scm.com/book/en/v2/Git-Basics-Git-Aliases


## Branching
http://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell
http://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
http://git-scm.com/book/en/v2/Git-Branching-Branch-Management
http://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows
http://git-scm.com/book/en/v2/Git-Branching-Remote-Branches


## Rebasing
http://git-scm.com/book/en/v2/Git-Branching-Rebasing


## Reference
- http://git-scm.com/book/en/v2/