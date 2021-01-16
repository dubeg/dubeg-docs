---
date: 2018-08-17
title: Readme
menu:
    sidebar:
        parent: Powershell
---


## Execution Policy

* Restricted
    + No scripts can be run (default)
* AllSigned
    + Only scripts signed by a trusted publisher.
* RemoteSigned
    + Local scripts can be run, downloaded scripts must be signed.
* Unrestricted
    + Can run any script.

```
Get-ExecutionPolicy
Set-ExecutionPolicy Unrestricted
# OR
Set-ExecutionPolicy RemoteSigned
```


## Profile
```
Test-Path $profile
New-Item -path $profile -type file -force
notepad $profile
```


## Help
```
# Save help files on the local system.
# Requires elevated privileges.
Update-help

Get-Help cmdlet
cmdlet -?
Get-Help cmdlet -Full
    detailed
    parameter *
    examples
Get-Help about_*
Get-Help about_command_syntax
```


## Command information

CommandTypes

- Application
- Cmdlet
- Function
- Alias
- Script

```
Get-Command cmd*
Get-Command -CommandType Application
```


## Alias
```
Set-Alias
Get-Alias
Get-Alias -Name x*
Get-Alias -Definition select-string
```


## Listing
```
Get-ChildItem
ls
ls -force
ls -filter <search>
ls -filter *.txt
```



## Consistency
As an example, the Sort-Object cmdlet works for the ouput of any cmdlet.

Which makes unnecessary learning the sorting features of other cmdlets.
Powershell gives a framework with basic features, and forces them to be consistent.


## Object Oriented
The output of any command is an object. This enables sending the outputted object to another command as its input.


## Concepts
* Commands aren't text-based
* Command Family is extensible
    - Interfaces such as Cmd.exe don't provide ways to directly extend the built-in command set. It is possible to create external CL tools that run in cmd.exe, but they don't have services such as help integration, and Cmd.exe doesn't automatically know that they exist.
    - The native binary commands in Powershell (cmdlets) can be augmented by cmdlets created by developers added using snap-ins.
    Snap-ins are compiled, and enables to add Powershell providers as well as cmdlets.

* Powershell handles console input and display
    Powershell always processes the command-line input directly.
    It also formats the output seen on the screen.
    This is of note, because it reduces the work required of each cmdlet and ensures consistent behavior across cmdlets.

    Even when running traditional command-line tools in Powershell,
    PS will processes the parameters and passes the results to the external tools.

* Cmdlets use verb-noun names to reduce command memorization
    - Get-Process
    - Stop-Process
    - Get-Service
    - Stop-Service

```
# List all commands that include a particular verb:
Get-Command -Verb <verb>

# List all commands that include a specific noun:
Get-Command -Noun <noun>
```

* A command is not necessarily a cmdlet
    + `Clear-Host`: clears the console window.
    +  This command is actually an internal function, as you can see if you run Get-Command against it: `Get-Command -Name clear-host`.

* Cmdlets use standard parameters
    + Powershell processes parameters directly, and it uses this direct access to the params along with developer guidance to standardize parameter names.
    + It does not guarantee that every cmdlet will conform to the standards, but it does encourage it.
    + Parameter names always have a '-' prepended to them. It allows Powershell to clearly identify them as parameters.

## Common Parameters
* WhatIf
* Confirm
* Verbose
* Debug 
* Warn
* ErrorAction
* ErrorVariable
* OutVariable
* OutBuffer


## Suggested Parameters
Powershell core cmdlets use standard names for similar params. Although the use of param names is not enforced, there is explicit guidance for usage to encourage standardization.

- ComputerName
- Force
- Exclude
- Include
- PassThru
- Path
- CaseSensitive



## Common aliases
- cat
- cd
- clear
- copy
- del
- dir
- ls
- echo
- mount
- rm
- sort


## Standard Aliases
- The verb Get is abbreviated to g.
- The verb Set is abbreviated to s.
- The noun Item is abbreviated to i.
- The noun Location is abbreviated to l.
- The noun Command is abbreviated to cm.


Examples: 

- Get-Item, alias: gi
- Set-Item, alias: si
- Get-Command, alias: gcm



## Tab Expansion
Allows you to fill in filenames or cmdlet names by pressing TAB.
Pressing TAB repeatedly will cycle through all available choices.

For cmdlets, type the entire first part (verb) and the hyphen that follows it before pressing TAB.



## Environment Variables
```
gci env:
$env:<var>
$env:USERNAME

# Process scope
$env:<NewVar> = "value"

# System scope
[Environment]::SetEnvironmentVariable("var", "value", "User");
# Instead of "User", it couldve been
# - "System"
# - "Process"

Remove-Item env:\<var>
[Environment]::SetEnvironmentVariable("var", $null, "User")
```

## References

- [Survival Guide](http://social.technet.microsoft.com/wiki/contents/articles/183.windows-powershell-survival-guide.aspx)
- [Cheatsheet](https://ramblingcookiemonster.files.wordpress.com/2012/09/powershell-cheat-sheet.pdf)