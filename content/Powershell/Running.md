---
date: 2018-08-17
title: Running stuff
menu:
    sidebar:
        parent: Powershell
---

Runnables

- cmdlets
- scripts
- programs

Solutions

- Invoke-Expression
- Invoke-Command
- & (operator)
- Start-Job -ScriptBlock { ... }


## Direct invocation
Using the environment path, or from a local folder.
Local runnables must be prefixed with `.\`.


From current folder:
```
.\app.exe
.\script.exe
```

From the environment path:
```
npm
node
explorer.exe
```


## Invoke-Expression 
- Alias: iex
- Executes a string as code.
- Not used to run an executable.

```
$str = "Get-Process"
iex $str
```


## Invoke-Command 
- Alias: icm
- Run commands on localhost, or remote machines via WinRM.
- Great for executing code on multiple machines over wsman.
- Not async.

```
$scriptBlock = { ping server }
Invoke-Command -ScriptBlock $scriptBlock -ComputerName "server1", "server2"
```


## Invoke-Item 
- Alias: ii
- Forces the default action to be run on the item.
- Good for opening a file with its default program.
- Not good for executing a program.


## Call operator (&)
- Used to treat a string as a single command.
- Useful for dealing with spaces.
- Runs a command, script or script block.
- Runs commands that are stored in variables (represented by strings)
- Doesnt parse the command, it won't interpret command parameters.

```
$cmd = "app.exe"
$arg1 = "fn1"
$arg2 = "-switch1"
$arg3 = "fn2"
& $cmd $arg1 $arg2 $arg3
```


## Start-Process
- Alias: start, saps
- Executes a program, and returns a process object.
- Can wait for the process to end.


## cmd /c
Bypasses Powershell and run the command from `cmd.exe`.

- Opens a cmd prompt from within Powershell, then executes the command.
- /c tells cmd that it should terminate after the command has completed.
- No reason to use this with Powershell v3.
