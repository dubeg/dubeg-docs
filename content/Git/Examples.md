---
date: 2018-09-27
title: Examples
menu:
    sidebar:
        parent: Git
        identifier: git-examples
---



## Help
```
   git help <cmd>
   git <cmd> -h       # Short version
   git <cmd> --help   # Long version
```
## Config
```
	# Files 
	# ~~~~~~~~~~
	etc/gitconfig 		# System-specific
	~/.gitconfig 		# User-specific
	.git/config 		# Repository-specific

	# Setup ID
	# ~~~~~~~~~~
	git config --global user.name "<name>"
	git config --global user.email "<email>"

	# Setup editor
	# ~~~~~~~~~~
	git config --global core.editor <pathToEditor>

	# View
	# ~~~~~~~~~~
	git config --system
	git config --global
	git config --local

	git config --list
	git config <key>
```
## Init
```
	git init 		# Init empty repository
	git add .		# Add new/modified files to the stating area
						# Cur. directory : .
						# Wildcard       : *

	git commit 		# Commit staging area.
	git commit -m "<msg>"
						# Commit message
						# Title of <= 50 characters, then empty line, then description.
```
### Github
```
	# New project
	# ~~~~~~~~~~
	git init
	git add README.md
	git commit -m "Init repo."
	git remote add origin "https://<...>.git"
	git push -u origin master 
	           
	# Existing project
	# ~~~~~~~~~~
	# 1. Copy from server to local machine.
	# 2. List all branches.
	# 3. Checkout local branch (copied from remote branch)

	git clone https://github.com/<user>/<repository>.git <projectName>
	git branch -a
	git checkout -b <newLocalBranch> origin/<remoteBranch>    


	# Forked repository
	# ---------------------------
	# 1. Display all remotes.
	# 2. Link local to original repository.
	# 3. Retrieve changes from original repository.
	# 4. Checkout branch master.
	# 5. Merge upstream/master in local master.
	# 6. Sync original repo with the local repo.  

	git remote -v
	git add upstream https://github.com/<user>/<repository>.git
	git fetch upstream 
	git checkout master
	git merge upstream/master
	git push
```
## Staging
```
	git add <file>
	git add <file>, <file>, ..
	git add <directory>

	# Interactive
	# ~~~~~~~~~~
	git add -i 
	git add -p <file>

	# [y,n,q,a,d,/,j,J,g,s,e,?]				
	# 	y stage this hunk for the next commit
	# 	n do not stage this hunk the next commit
	# 	q quit; do not stage this hunk or any of the remaining ones
	# 	a stage this hunk and all later hunks in the file
	# 	d do not stage this hunk or any of the later hunks in the file
	# 	g select a hunk to go to
	# 	/ search for a hunk matching the given regex
	# 	j leave this hunk undecided, see next undecided hunk
	# 	J leave this hunk undecided, see next hunk
	# 	k leave this hunk undecided, see previous undecided hunk
	# 	K leave this hunk undecided, see previous hunk
	# 	s split the current hunk into smaller hunks
	# 	e manually edit the current hunk
	# 	? print help
```
## Removing
```
	# Remove
	# ~~~~~~~~~~
	git rm           # Remove
	git rm -f        # Force removal
	git rm --cached  # Stop tracking, but keep file.

	# Examples
	# ~~~~~~~~~~
	git rm --cached README
	git rm log/\*.log
```
## Moving
```
	# Move or 
	# Rename
	# ~~~~~~~~~~
	git mv <name> <newName>
```
## Differences
```
	# Differences
	# - display lines added/removed.
	# - output program specified in..
	#   1. config 'core.pager'
	#   2. $GIT_PAGER 
	#   3. $PAGER
	#   4. 'less'
	# ~~~~~~~~~~
	git diff
	git diff --staged
	git diff --cached    # Staged and cached are synonyms.
	
	# Status
	# ~~~~~~~~~~
	git status
	git status --short
```
## Undoing
```
	# Replace last commit
	# - to rewrite commit message.
	# - to add forgotten files.
	# ~~~~~~~~~~
	git commit --amead

	# Unstage file
	# ~~~~~~~~~~
	git reset HEAD <file>

	# Revert changes 
	# ~~~~~~~~~~
	git checkout -- <file>

	# N:
	# What does double-dash `--` mean?
	# It's used in commands to signify the end of command options, after which only positional parameters are accepted. 
	# In other words, it separates options from positional parameters.
	# cmd -<option> -- <param1> <param2>

```
## History
```
	# Display changes, from most recent to oldest.
	# -p   : show differences introduced in each commit.
	# -<#> : limits to last # entries.
	# --stat    : show stats for each commit.
	# --pretty  : formats output
	# --pretty=online
	# --pretty=short
	# --pretty=full
	# --pretty=fuller
	# --pretty=format:"<string>"
	
	git log 
	git log -p 					
	git log --stat --summary
	git log --since=2.weeks
	git log --since="2 years"
	git log --since="2008-01-01"
	git log --until
	git log -S "<code>"
```
## Branches
```
	# Display
	# ~~~~~~~~~~
	git branch    # Display all 					
	   -v 		  # Display last commit on each branch.
	   -vv        # Display local and their upstream branches.
	   --merged 	 # Display filtered list..
		--no-merged  # Display filtered list..

	# Manage
	# ~~~~~~~~~~
	git branch <name>     # Create branch
	git branch -d <name>  # Delete, but has to be merged.
	git branch -D <name>  # Delete without condition.
	git branch -u <remote>/<branch>  # Set upstream

	# Switch
	# ~~~~~~~~~~
	git checkout <name>
	git checkout -b <branch> <remote>/<name>
	git checkout --track <remote>/<name>
	git checkout --track <new> <remote>/<name>
								
	# Delete remote 
	# ~~~~~~~~~~
	git push origin --delete <branchName>
```
## Merging
```
	# Tool
	# ~~~~~~~~~~
	# config: merge.tool = <program>
	# config: merge.tool.<program>.cmd = "Path/<program>.exe" "$BASE" "$LOCAL" "$REMOTE" "$MERGED"
	

	# Merge
	# ~~~~~~~~~~
	git merge 	        # Open with merge tool
	git merge <branch>  # Merge-in <branch> (into the current branch).


	# Resolving conflits
	# ~~~~~~~~~~
	git diff 			 # 1. Display conflicts
	   					 # 2. Resolve conflits manually.
	git commit -a 		 # 3. Commit changes.
	gitk 					 # 4. Display resulting history.
```
## Pulling
```
```
## Stashing
```
```
	