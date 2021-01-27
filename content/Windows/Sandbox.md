---
date: 2021-01-27
title: Sandbox
menu:
    sidebar:
        parent: Windows
---

```
<Configuration>
	<Networking>Disable</Networking>
	<MappedFolders>
	   <MappedFolder>
	     <HostFolder>C:\Users\gdube\Downloads</HostFolder>
	     <ReadOnly>true</ReadOnly>
	   </MappedFolder>
	</MappedFolders>
	<LogonCommand>
	   <Command>explorer.exe C:\users\WDAGUtilityAccount\Desktop\Downloads</Command>
	</LogonCommand>
</Configuration>
```

## References
- techcommunity.microsoft.com/t5/windows-kernel-internals/windows-sandbox-config-files/ba-p/354902