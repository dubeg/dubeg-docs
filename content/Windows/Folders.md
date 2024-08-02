---
date: 2019-12-02
title: Folders
menu:
    sidebar:
        parent: Windows
---

## Locations of interest
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions`
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop`
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer`
- `HKEY_LOCAL_MACHINE\Software\Classes\CLSID`
```
   System.IsPinnedToNameSpaceTree
      1 (REG_DWORD)
      0
   SortOrderIndex
      84 (dec)
      56 (dec)
      42 (hex), dec:66
```



# CLSID
- `{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}`: 3D Objects
- `{0E5AAE11-A475-4c5b-AB00-C66DE400274E}`: Shell File System Folder
- `{031E4825-7B94-4dc3-B131-E946B44C8DD5}`: UsersLibraries
- `{679f85cb-0220-4080-b29b-5540cc05aab6}`: Quick Access
- `{A8CDFF1C-4878-43be-B5FD-F8091C1C60D0}`: Personal
- `{374DE290-123F-4565-9164-39C4925E467B}`: Downloads
- `{3ADD1653-EB32-4cb0-BBD7-DFA0ABB5ACCA}`: My Pictures
- `{1CF1260C-4DD0-4ebb-811F-33C572699FDE}`: My Music
- `{A0953C92-50DC-43bf-BE83-3742FED03C9C}`: My Videos
- `{d3162b92-9365-467a-956b-92703aca08af}`: Local Documents
- `{088e3905-0323-4b02-9826-5d99428e115f}`: Local Downloads
- `{24ad3ad4-a569-4530-98e1-ab02f9417aa8}`: Local Pictures
- `{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}`: Local Music
- `{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}`: Local Videos
- `{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}`: Desktop
- `{DFFACDC5-679F-4156-8947-C5C76BC0B67F}`: Profile
- `{59031a47-3f72-44a7-89c5-5595fe6b30ee}`: UsersFiles
- `{20D04FE0-3AEA-1069-A2D8-08002B30309D}`: This PC
- `{F02C1A0D-BE21-4350-88B0-7367FC96EF3C}`: Computers and Devices *(aka. Network) (pinned by default)*
- `{B4FB3F98-C1EA-428d-A78A-D1F5659CBA93}`: Other Users Folder *(aka. Homegroup) (pinned by default)*
- `{645FF040-5081-101B-9F08-00AA002F954E}`: Recycle Bin
- `{A8A91A66-3A7D-4424-8D24-04E180695C7A}`: Device Center *(aka. Device and Printers)*
- `{26EE0668-A00A-44D7-9371-BEB064C98683}`: Control Panel
- `{F5FB2C77-0E2F-4A16-A381-3E560C68BC83}`: Removable Drives


Others

- `{5b934b42-522b-4c34-bbfe-37a3ef7b9c90}`: This Device
   + InProcServer32
      - (Default): %SystemRoot%\System32\windows.storage.dll
      - ThreadingModel: Apartment
   + Instance
      - CLSID: {0E5AAE11-A475-4c5b-AB00-C66DE400274E}
      - PropertyBag
         + TargetKnownFolder: `{DFDF76A2-C82A-4D63-906A-5644AC457385}` *(Public)*

- `{f8278c54-a712-415b-b593-b77a2be0dda9}`: This Device
   + (default): This Device
   + InProcServer32
      - (Default):REG_EXPAND_SZ:%SystemRoot%\System32\windows.storage.dll
      - ThreadingModel:REG_SZ:Apartment
   + Instance
      - CLSID: {0E5AAE11-A475-4c5b-AB00-C66DE400274E}
      - InitPropertyBag
         + AllowChildAliasRegistration:REG_DWORD: 1 (hex)
         + Attributes:REG_DWORD: 11 (hex)
         + TargetKnownFolder: {5E6C858F-0E22-4760-9AFE-EA3317B67173}
   + ShellFolder
      - (default):
      - Attributes:REG_DWORD:f0900105 (hex)
      - FolderValueFlags:REG_DWORD:500020 (hex)

- `{26EE0668-A00A-44D7-9371-BEB064C98683}`: Control Panel
   + ...
   + ShellFolder
      - Attributes: 0xa0000004
         + SFGAO_FOLDER
         + SFGAO_HASSUBFOLDER
      - FolderValueFlags: 0x1201

- `{679f85cb-0220-4080-b29b-5540cc05aab6}`: Quick Access
   + ...
   + ShellFolder
      - Attributes: 0xa0100000
         + SFGAO_NONENUMERATED
            - Items should be hidden.
         + SFGAO_FOLDER
         + SFGAO_HASSUBFOLDER
      - FolderValueFlags: 0x1



## FolderDescriptions
- HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions
   + `{0AC0837C-BBF8-452A-850D-79D08E667CA7}`: MyComputerFolder
   + `{1C2AC1DC-4358-4B6C-9733-AF21156576F0}`: ThisDeviceFolder
   + `{754AC886-DF64-4CBA-86B5-F7FBF4FBCEF5}`: ThisPCDesktopFolder
   + `{FDD39AD0-238F-46AF-ADB4-6C85480369C7}`: Personal
   + `{A52BBA46-E9E1-435f-B3D9-28DAA648C0F6}`: OneDrive
   + `{374DE290-123F-4565-9164-39C4925E467B}`: Downloads
   + `{4BD8D571-6D19-48D3-BE97-422220080E43}`: My Music
   + `{5E6C858F-0E22-4760-9AFE-EA3317B67173}`: Profile
   + `{DFDF76A2-C82A-4D63-906A-5644AC457385}`: Public
   + `{f3ce0f7c-4901-4acc-8648-d5d44b04ef8f}`: UsersFilesFolder
   + `{f42ee2d3-909f-4907-8871-4c22fc0bf756}`: Local Documents
   + `{7d83ee9b-2244-4e70-b1f5-5393042af1e4}`: Local Downloads
   + `{0ddd015d-b06c-45d5-8c4c-f59713854639}`: Local Pictures
   + `{a0c69a99-21c8-4671-8703-7934162fcf1d}`: Local Music


Notes  
`ThisDeviceFolder` has the parsingName `{f8278c54-a712-415b-b593-b77a2be0dda9}`,
which itself has the TargetKnownFolder `{5E6C858F-0E22-4760-9AFE-EA3317B67173}` *(Profile)*.




## Desktop Namespace (Root)
- HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop
   + \NameSpace
      - `{031E4825-7B94-4dc3-B131-E946B44C8DD5}`: CLSID UsersLibraries
      - `{26EE0668-A00A-44D7-9371-BEB064C98683}`: CLSID ControlPanelHome
      - `{4336a54d-038b-4685-ab02-99bb52d3fb8b}`: CLSID Public folder
      - `{450D8FBA-AD25-11D0-98A8-0800361B1103}`: CLSID Documents
      - `{5399E694-6CE5-4D6C-8FCE-1D8870FDCBA0}`: CLSID ControlPanelStartupPage
      - `{59031a47-3f72-44a7-89c5-5595fe6b30ee}`: CLSID UsersFiles
      - `{5b934b42-522b-4c34-bbfe-37a3ef7b9c90}`: CLSID This Device Folder
      - `{645FF040-5081-101B-9F08-00AA002F954E}`: CLSID Recycle Bin
      - `{8FD8B88D-30E1-4F25-AC2B-553D3D65F0EA}`: CLSID DXP
      - `{B4FB3F98-C1EA-428d-A78A-D1F5659CBA93}`: CLSID Other Users
      - `{BD7A2E7B-21CB-41b2-A086-B309680C6B7E}`: CLSID CSC Folder
      - `{EDC978D6-4D53-4b2f-A265-5805674BE568}`: CLSID StreamBackedFolder
      - `{F02C1A0D-BE21-4350-88B0-7367FC96EF3C}`: CLSID Computers and Devices
      - `{F3F5824C-AD58-4728-AF59-A1EBE3392799}`: CLSID Sticky Notes ...
      - \DelegateFolders
         + `{F5FB2C77-0E2F-4A16-A381-3E560C68BC83}`: Removable Drives
- HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop
   + \NameSpace
      - `{018D5C66-4533-4307-9B53-224DE2ED1FE6}`: CLSID OneDrive
      - `{E31EA727-12ED-4702-820C-4B6445F28E1A}`: CLSID DropBox



## ThisPC Namespace
- HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\MyComputer
   + \NameSpace
      - `{A8CDFF1C-4878-43be-B5FD-F8091C1C60D0}`: CLSID Personal
      - `{374DE290-123F-4565-9164-39C4925E467B}`: CLSID Downloads
      - `{1CF1260C-4DD0-4ebb-811F-33C572699FDE}`: CLSID My Music
      - `{3ADD1653-EB32-4cb0-BBD7-DFA0ABB5ACCA}`: CLSID My Pictures
      - `{A0953C92-50DC-43bf-BE83-3742FED03C9C}`: CLSID My Videos
      - `{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}`: CLSID Desktop
      - `{088e3905-0323-4b02-9826-5d99428e115f}`: CLSID Local Downloads
      - `{d3162b92-9365-467a-956b-92703aca08af}`: CLSID Local Documents
      - `{24ad3ad4-a569-4530-98e1-ab02f9417aa8}`: CLSID Local Pictures
      - `{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}`: CLSID Local Videos
      - `{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}`: CLSID Local Music
      - \DeletageFolders
         + `{289AF617-1CC3-42A6-926C-E6A863F0E3BA}`: DLNA Media DataSource
         + `{35786D3C-B075-49b9-88DD-029876E11C01}`: Portable Devices
         + `{9113A02D-00A3-46B9-BC5F-9C04DADDD5D7}`: Enhanced Storage DataSource
         + `{b155bdf8-02f0-451e-9a26-ae317cfd7779}`: Nethood delegate folder
   + \RemovableStorage
      - `{35786D3C-B075-49b9-88DD-029876E11C01}`: CLSID Portable Devices


## UsersFiles Namespace
- HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\UsersFiles
   + \NameSpace
      - \DelegateFolders
         + `{DFFACDC5-679F-4156-8947-C5C76BC0B67F}`: CLSID Profile



## FolderTypes
- HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\FolderTypes
   + {24ccb8a6-c45a-477d-b940-3382b9225668} 
      - `cname:HomeFolder` 
      - `alias QuickAccess`
      - LayoutType: 1
   + {7d49d726-3c21-4f05-99aa-fdc2c9474656} 
      - `cname:Documents` 
      - `class:Document`   
      - LayoutType: 7
      - Theme:document
         + TopViews
            - LogicalViewMode: 0x01
   + {CD0FC69B-71E2-46e5-9690-5BCD9F57AAB3} 
      - `cname:UserFiles` 
      - LayoutType: 1
      - Theme:default
         + TopViews
            - LogicalViewMode: 0x03
            - IconSize: 0x30
         + Modifiers
            - Library: {fbb3477e-c9e4-4b3b-a2ba-d3f5d3cd46f9}
            - LibraryFolder: {3f98a740-839c-4af7-8c36-5badfb33d5fd}
   + {b3690e58-e961-423b-b687-386ebfd83239} 
      - `cname:Pictures` 
      - `class:Image`
      - LayoutType: 5
      - Theme:picture
         - TopViews
            + LogicalViewMode: 0x03
            + IconSize: 0x60



## Icons
- App: IconsExtract from nirsoft
- DLLs
   + `system32\shell32.dll`
   + `system32\imageres.dll`
   + `system32\dsuiext.dll`
   + `system32\ieframe.dll`
   + `system32\wmploc.dll`
- Icons of interest
   + Desktop: `%SystemRoot%\system32\imageres.dll,-183`
   + Documents: `%SystemRoot%\system32\imageres.dll,-112`
   + Downloads: `%SystemRoot%\system32\imageres.dll,-184`
   + Music: `%SystemRoot%\system32\imageres.dll,-108`
   + Pictures: `%SystemRoot%\system32\imageres.dll,-113`
   + Videos: `%SystemRoot%\system32\imageres.dll,-189`
   + Favorites: `%SystemRoot%\system32\imageres.dll,-115,-1020`
   + Libraries: `%SystemRoot%\system32\imageres.dll,-1023`
   + Search: `%SystemRoot%\system32\imageres.dll,-18,-1025`
   + BlankFile: `%SystemRoot%\system32\imageres.dll,-2`
   + Folder: `%SystemRoot%\system32\imageres.dll,-3 / -4`
   + FullFolder: `%SystemRoot%\system32\imageres.dll,-162`
   + UserFolder: `%SystemRoot%\system32\imageres.dll,-123,-1029`
   + FontsFolder: `%SystemRoot%\system32\imageres.dll,-129`
   + OneDrive: `%SystemRoot%\system32\imageres.dll,-1040,-1043`

To change icons using desktop.ini:
```
[.ShellClassInfo]
...
IconFile=%SystemRoot%\system32\imageres.dll
IconIndex=-3
```



## Tips
- You can access virtual folders in FileExplorer by typing in the address bar its GUID in the following format: `shell:::{guid}`.
- Hide system virtual folders from your User Profile folder:
  `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions\<ID>\PropertyBads`
   + "ThisPCPolicy"="Hide"
- Customize icon: to be able to change an icon in explorer, you must not be in a shell folder path. You must start from the root and then locate the folder, and only then will the customize icon appear.
- ParsingName: removing it from an instance of FolderDescriptions will let it resolve by itself.


## Network shortcuts
To add shortcuts that appears under Network locations (`Explorer -> This PC -> Network locations`) automatically,
you need to add shortcuts files in the directory:

```
shell:AppData\Microsoft\Windows\Network Shortcuts
%USERPROFILE%\AppData\Roaming\...
```


## Add home folder to desktop namespace
- Import the following key into regedit.
   + Verify that the `TargetFolderPath` is correct.
   + You may change the name of the shortcut to a different value (`Home`).

```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}]
@="Home"
"System.IsPinnedToNameSpaceTree"=dword:00000001
"SortOrderIndex"=dword:00000042

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}\DefaultIcon]
@="C:\\Windows\\system32\\imageres.dll,-123"

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}\InProcServer32]
@=hex(2):25,00,73,00,79,00,73,00,74,00,65,00,6d,00,72,00,6f,00,6f,00,74,00,25,\
  00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,73,00,68,00,\
  65,00,6c,00,6c,00,33,00,32,00,2e,00,64,00,6c,00,6c,00,00,00

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}\Instance]
"CLSID"="{0E5AAE11-A475-4c5b-AB00-C66DE400274E}"

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}\Instance\InitPropertyBag]
"Attributes"=dword:00000011
"TargetFolderPath"="C:\\Users\\gdube"

[HKEY_CLASSES_ROOT\CLSID\{b1969a7f-f7d3-4032-a021-b026d537c04b}\ShellFolder]
"FolderValueFlags"=dword:00000028
"Attributes"=dword:f080004d
```

- Add to Desktop namespace.
   + `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Desktop`
      - Add GUID as a key under the NameSpace key.
- Hide icon from Desktop.
   + `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\HideDesktopIcons\NewStartPanel`
      - Add GUID to the key, as DWORD set to 1.



## Resources
- http://www.winhelponline.com/blog/add-custom-folder-this-pc-navigation-pane-windows/
- http://www.winhelponline.com/blog/show-hide-shell-folder-namespace-windows-10/
- https://www.tenforums.com/tutorials/81222-change-icons-folders-pc-windows-10-a.html
- https://msdn.microsoft.com/en-us/library/windows/desktop/dn889934(v=vs.85).aspx
- https://www.codeproject.com/Articles/1649/The-Complete-Idiot-s-Guide-to-Writing-Namespace-Ex
- https://github.com/google/google-drive-shell-extension
- https://www.codeproject.com/Articles/88/Namespace-extensions-the-undocumented-Windows-Shel
- http://bcbjournal.org/articles/vol4/0001/Enumerating_the_shell_namespace.htm
- https://msdn.microsoft.com/en-us/library/windows/desktop/cc144095(v=vs.85).aspx 
   + Unstanding Shell Namespace
- https://msdn.microsoft.com/en-us/library/windows/desktop/cc144090(v=vs.85).aspx 
   + Introduction to Shell Namespace
- https://github.com/libyal/libfwsi/wiki/Folder-Type-Identifiers


## Remove 3D Objects
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace
   + Remove: {0DB7E03F-FC29-4DC6-9020-FF41B59E513A}
```

And:
```
HKEY_CLASSES_ROOT\CLSID\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}
   + System.IsPinnedToNameSpaceTree: 0
```
