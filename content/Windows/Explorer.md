---
date: 2020-03-30
title: Explorer
menu:
    sidebar:
        parent: Windows
---


## Lag issue
I would open a File Explorer window, then try to create a new folder or file, and it'd take ~5-10 seconds before it would up.
Creating a new folder using Powershell was not impacted.
Booting in Safe Mode fixed the latency in Explorer.

Clear all files within the following folder fixed the latency. It clears all Quick Access links.
File Explorer was probably hanging because of one such link.

```
%AppData%\Microsoft\windows\recent\automaticdestinations
```


## Pin Home
Add a shortcut to USERPROFILE in the root namespace.


### Show in FileExplorer sidebar
Add it to your user's Desktop NameSpace.
`Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace`


### Hide on Desktop (background)
`Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel`
    {c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}, DWORD, 0x1



### Change TargetFolderPath
Notice how's its set in Home.reg:
```
"TargetFolderPath"=hex(2):25,00,55,00,53,00,45,00,52,00,50,00,52,00,4f,00,46,\
  00,49,00,4c,00,45,00,25,00,00,00
```

The current value is: %USERPROFILE%.
The easiest way is to simply change it from REGEDIT.

You can't simply set it as follows, because the REG_EXPAND_SZ format is needed to make env variables work.
```
"TargetFolderPath"="%USERPROFILE%"
```

You can however set it as follows,
because you're specifying an absolute path.
```
"TargetFolderPath"="C:\\Users\\gdube"
```



## Rename This PC
HKLM > CLSID > {20D04FE0-3AEA-1069-A2D8-08002B30309D}
- Set value of (default)
- Remove value LocalizedString.


## Unpin Network
HKLM > CLSID > {F02C1A0D-BE21-4350-88B0-7367FC96EF3C}
- Add (DWORD) System.IsPinnedToNameSpaceTree: 0


## Sample
```
Windows Registry Editor Version 5.00

[-HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}]

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}]
@="Home"
"System.IsPinnedToNameSpaceTree"=dword:00000001
"SortOrderIndex"=dword:00000042

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}\DefaultIcon]
@="C:\\windows\\system32\\imageres.dll,-123"

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}\InProcServer32]
@=hex(2):25,00,73,00,79,00,73,00,74,00,65,00,6d,00,72,00,6f,00,6f,00,74,00,25,\
  00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,73,00,68,00,\
  65,00,6c,00,6c,00,33,00,32,00,2e,00,64,00,6c,00,6c,00,00,00

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}\Instance]
"CLSID"="{0E5AAE11-A475-4c5b-AB00-C66DE400274E}"

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}\Instance\InitPropertyBag]
"Attributes"=dword:00000011
"TargetFolderPath"=hex(2):25,00,55,00,53,00,45,00,52,00,50,00,52,00,4f,00,46,\
  00,49,00,4c,00,45,00,25,00,00,00

[HKEY_CURRENT_USER\Software\Classes\CLSID\{c5125f38-fa3f-41f0-8e5f-a7ee8f38e894}\ShellFolder]
"FolderValueFlags"=dword:00000028
"Attributes"=dword:f080004d


```