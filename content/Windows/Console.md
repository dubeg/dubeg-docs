---
date: 2018-09-27
title: Console vs Shell
menu:
    sidebar:
        parent: Windows
---



## Console
Your computer has many console mode programs. It has only one Cmd.exe, which is the command interpreter. It displays a prompt and lets you type commands to start programs.

You ought to play with Dumpbin.exe, which is included with Visual Studio. Use its `/headers` option to look at the header of an executable file. Such a file indicates what sub-system it wants to run on. There are three common ones you can encounter:

- `Native`
    + Targets the native Windows operating system, used by device drivers. 
    + Ex: the ones you find in `c:\windows\system32\drivers`. 
    + The native OS resembles VMS, the operating system that Dave Cutler and his team created when they worked for DEC. It is only partially documented: just the parts that you need to write a driver.
- `Windows GUI`
    + A Win32 process that creates its own windows, using `CreateWindow()`.
    + Ex: `Notepad.exe`.
- `Windows CUI`
    + A Win32 process that needs a __console__ window.
    + The OS automatically creates it before starting the program. 
    + Ex: `Cmd.exe`.

Windows used to have more sub-systems, like OS/2 and Posix, but they fell out of use. Win32 won by a land-slide. The distinction between the native OS and the API layer is also the core way Microsoft innovates on the OS. The Win32 api is frozen in stone and can never be changed, only added to. They can change the native OS as they see fit. Vista was the last one with very drastic changes, major version 6. Windows 2000 was the previous one, major version 5.


## Windows Shell
Aka `Explorer.exe`.

The terms "shell" and "Explorer" are often used interchangeably in some of Microsoft's documentation. This is because Explorer.exe is the entire Windows shell. A shell extension is in fact an Explorer extension. It is confusing because most people think of the Explorer as the window (shown in Figure 5) that explores the name space. Explorer is also the application that owns and controls the desktop and the name space data. When you're implementing a name space extension (or any shell extension), think of the big picture as just a collection of shell extensions, all owned by Explorer. Other parts of Windows 95 system code also use these extensions, including the File Open and File Save common dialogs.


## Disclaimer
2019-06-28: I most likely copy-pasted most of this document from the answer from S.O. Just keep that in mind.

### References 

- http://stackoverflow.com/questions/28345895/what-is-the-difference-between-win32-console-and-command-prompt


