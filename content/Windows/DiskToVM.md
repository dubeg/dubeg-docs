# Disk to VM

## Offline (fast)
1. CloneZilla: clone disk to disk (~5min)
2. Disk2vhd (Sysinternals): disk to vhdx (~5min)
	* If using Hyper-V as VM solution,
	  open vhd and change in registry:
```
C:\Windows\System32\Config\SYSTEM
	ControlSet001/Services/
		aliide => Start: 3
		amdide => Start: 3
		atapi => Start: 0
		cmdide => Start: 3
		iaStorV => Start: 3
		intelide => Start: 0
		msahci => Start: 3
		pciide => Start: 3
		viaide => Start: 3

		or

		Atapi => Start:0
		Intelide => Start:0
		LSI_SAS => Start:0
		?
		msahci => Start:0
Start:0 => Start at Windows startup.
Start:3 => Started manually.
```

3. Starwind V2V Converter: vhdx to vmdk (~5min)
	+ ...

3. Paragon Backup for Hyper-V Host™ CE
	+ Backup: vhd to vmdk (needs to be a VirtualMachine in Hyper-V manager)
	+ Then, create VM and attach vmdk (using VMWare Workstation).



## Scenarios
```
---------------------------
Machine to VHD/VMDK
---------------------------
PC 
-> (CloneZilla) External HDD 
-> (disk2vhd) VHD
-> Mount VHD and edit registry to load IDE driver (instead of Sata/AHCI)
-> (StarWind) vmdk
-> (VMWareWorkstation) vmx
	* Attach vmdk as IDE
---------------------------
```

```
---------------------------
Machine to VMWare VM
---------------------------
---------------------------
```


```
---------------------------
Machine to VMWare VM 
* 230GO (10 mins)
---------------------------
PC
-> (VMWare Converter) vmx
---------------------------
```





## SCSI vs IDE vs SATA
At first, there was SCSI.
People could finally connect multiple devices to their computers.

Then came IDE, a faster/lower cost alternative.
IDE became the standard while SCSI stagnated.

Finally, SATA came with even more speed.
- Advanced Host Controller Interface (AHCI)



## Hyper-V Virtual Machine
+ System disk must be attached as IDE.
+ IDE disks can only be added when VM is offline.

+ Gen1 VM
	- Uses legacy BIOS
+ Gen2 VM: Windows 8[.1] >= x && 64bit
	- Uses UEFI BIOS
	- Can boot on SCSI drives (SATA drives are mapped as SCSI drives in Hyper-V)



##  References
- www.serverwatch.com/server-tutorials/hyper-v-2012-r2-pros-and-cons-of-generation-1-vs.-generation-2-vms.html

The IDE controller is emulated (vmwp.exe) where as the SCSI controller is synthetic.

The IDE controller implements an emulated IDE controller which means there is extra processing before the I/O is sent to the disk.

The SCSI controller in Windows Server virtualization is not emulated, instead it uses the VMBUS (Virtual Machine BUS). These devices have an advantage over emulated devices because they leverage the existing Windows driver architecture.

I see a lot of misinterpretation of this with older Gen1 VM's.  John Howard (MSFT) detailed it specifically in a TechNet article just over 7 years ago.

As Brent points out:  Server 2012R2 supports UEFI and therefore supports native VMBUS on boot. "Gen2" VM's, SCSI and IDE both, utilize VMBUS therefore there is no performance gains on "Gen2" VM's in using either.  This was not the case in Gen1's.