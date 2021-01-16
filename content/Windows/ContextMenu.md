---
date: 2018-09-27
title: ContextMenu
menu:
    sidebar:
        parent: Windows
---


## Remove Windows Defender's shell extension
```
regsvr32 /u "C:\Program Files\Windows Defender\shellext.dll"
```


## Remove undesirable entries from ContextMenu > New

1. Open regedit.
1. Under `Computer\HKEY_CLASSES_ROOT`
1. Find key "ShellNew".
1. Delete "ShellNew" keys that you find until satisfied.