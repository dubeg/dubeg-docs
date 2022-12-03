---
title: VMWare - Thick to thin disk
date: 2022-12-03
---

For converting thick to thin-provisioned disks

- To save space, or
- To make disks more portable,

You can use the tool `vmware-vdiskmanager`, bundled with VMWare Workstation.

- Location: `C:\Program Files (x86)\VMware\VMware Workstation\vmware-vdiskmanager.exe`

## Example
```
vmware-vdiskmanager.exe -r "source.vmdk" -t 0 "target.vmdk"
```
Parameters

- `r <inputDisk> <outputDisk>`
	+ Converts the input disk into a new output disk with the given type.
	+ Requires the `t` parameter to be specified.
- `t` (disk type)
	+ 0: create a growable virtual disk contained in a single virtual disk file
	+ 1: create a growable virtual disk split into 2GB files
	+ 2: create a preallocated virtual disk contained in a single virtual disk file
	+ 3: create a preallocated virtual disk split into 2GB files


Note:
Make sure you pass the correct .vmdk file that contains the disk's metadata, and not the disk's data files.


## References
- [PDF: VirtualDiskManager manual](https://www.vmware.com/pdf/VirtualDiskManager.pdf)
- [Post: converting vmware workstation thick disks vmdks to thin.](https://atherbeg.com/2013/02/04/converting-vmware-workstation-thick-disks-vmdks-to-thin/)