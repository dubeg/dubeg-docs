---
date: 2021-01-27
title: Create ISO
menu:
    sidebar:
        parent: Windows
---

```
oscdimg.exe 
	-m 
	-o 
	-u2 
	-udfver102
	-bootdata:2
		#p0,e,bC:\ISO\boot\etfsboot.com
		#pEF,e,bC:\ISO\efi\microsoft\boot\efisys.bin 
	C:\ISO          # SourceLocation
	C:\Windows.iso  # TargetFile
```
- o: uses MD5 hashing algo to compare files
- m: ignores max size limit of an image
- u2: contains only UDF file system.
- udfver102: specifies UDF fs v1.02
- bootdata:`<nbrOfBootEntries>#<defaultEntry>#<entry1>#<entryN>`
- e: disables floppy disk emulation
- b: specifies boot sector file
- p: specifies value to use for platform ID
	+ 0x00: BIOS
	+ 0xEF: UEFI (default)
	+ Ex: p0
	+ Ex: pEF
- Reference
	+ docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/oscdimg-command-line-options