---
title: VMWare - USB 3 devices on Windows 7
date: 2024-08-02
---

Working in the industrial automation industry, technicians are constantly having to boot up old Windows OSes in virtual machines to service old machines here and there: maintenance, bugfix, whatever. Well it happened to me again today, and this time it was a Windows 7 virtual machine setup to run an old version of Siemens TIA Portal. 

## PCI passthrough is unsupported

We had to publish some project on a SD card to transfer to the panel PC in need of servicing, and our laptop model (Lenovo T series 2024) has an SD Card reader built-in, so that seemed easy enough. However we found out that our integrated SD Card reader communicates via PCI, & VMWare Workstation doesn't support attaching devices via PCI. ESXi does, but not Workstation.

### References

Our integrated SD card reader:

![](/Blog/Images/VMWare.USB3/Laptop.PCI.SD.Card.Reader.png)

PCI is unsupported:

![](/Blog/Images/VMWare.USB3/VMware.PCI.Unsupported.png "border")

- https://www.reddit.com/r/vmware/comments/1086tqv/pcie_passthrough/
- https://knowledge.broadcom.com/external/article/302487/internal-sd-card-reader-is-not-detected.html
	+ The KB is filed under VMware Fusion, but it's also pertinent for Workstation.

## USB 3.0 solution

So we thought to try an external SD card reader we had in store, but it turns out it was a USB 3.0 device. Moreover, all the USB ports on our laptop were also USB 3.0. It's a problem since Windows 7 doesn't come with a built-in USB 3.0 driver, supporting only USB 2.0 & prior. 

_Windows 8 & later does come with a generic USB 3.0 driver (xHCI), however._

### Find the driver

When you check the VMWare KB page for USB 3.0 support in Windows 7, it links you to a driver from Intel that you can use instead, but the link is dead. Not only is the link dead, the driver is simply not available on Intel's website anymore.

- VMWare KB: https://knowledge.broadcom.com/external/article/344598/usb-30-support-for-windows-7-virtual-mac.html
	+ Dead link: http://www.vmware.com/go/dl_intel_usb3_driver
	+ The link directs to a page on vmware.com, but even so, Intel removed its USB 3.0 driver from its download center years ago.
		- https://www.reddit.com/r/DataHoarder/comments/mq7sft/anybody_archive_intel_bios_and_drivers_from/
		- https://www.reddit.com/r/DataHoarder/comments/d6dkoi/intel_removing_unknown_amount_of_drivers_and/
		- https://archive.org/details/2014.01.download.intel.com

The alternative is to find the driver on a third-party site:

- https://www.majorgeeks.com/files/details/intel_usb_3_extensible_host_controller_driver.html
- https://community.intel.com/t5/Embedded-Server/The-Final-Intel-USB-3-0-eXtensible-Host-Controller-Driver-for/m-p/1511549#M1001

### Install the driver

Once you have the driver installer, do the following:

- Make sure your virtual machine has the USB Controller set to 3.0:
	+ VMWare > VM > Settings > USB Controller: 3.0
		- You may have to reboot the virtual machine after the change.
		- ![](/Blog/Images/VMWare.USB3/VMWare.USB.Controllers.png "border")
	+ Note: if it's set to 1.1 or 2.0, you'll get an error when running the installer: `The computer does not meet the minimum requirements for installing the software`.
		+ ![](/Blog/Images/VMWare.USB3/Intel.MinimumRequirements.png)
		+ It means the USB 3.0 Host controller wasn't found in the VM, which the Intel installer requires.
		+ Quoting `michaln` on virtualbox.org: 
			+ "Although it's perfectly possible to install drivers for hardware that is not (yet) plugged in, the Intel installer requires it, so that's how it is."
			+ Reference: https://forums.virtualbox.org/viewtopic.php?t=81660

- Install the driver within the virtual machine.

Once that's done, you should be able to attach your USB 3.0 device to the virtual machine.


## USB 2.0 alternative
If you can't find the Intel driver anywhere, or you need to use another OS that doesn't support it, you have two choices:

- Force the USB 3.0 device to communicate in USB 2.0 mode.
- Get a USB 2.0 device.

That means any of the following options:

1. `USB 3.0 device -> USB 2.0 Port on Host (laptop) -> VM (USB Controller: 2.0)`
2. `USB 3.0 device -> USB 2.0 Hub -> USB 3.0 Port on Host (laptop) -> VM (USB Controller: 2.0)`
	+ The hub can even be a UGREEN x-in-one attached via USB-C (USB 3.0) to your laptop, as long as the port itself is USB 2.0.
		+ Eg. UGREEN Revodok USB-C Hub, 5-in-1
		+ https://www.amazon.ca/dp/B0BR3M8XHK/
		+ ![](/Blog/Images/VMWare.USB3/UGREEN.5in1.USB2.jpg)
	+ Note: blue ports are always USB 3.x
3. `USB 2.0 device -> USB 3.0 Port on Host (laptop) -> VM (USB Controller: 2.0)`


### Reference

https://knowledge.broadcom.com/external/article/307817/host-and-guest-os-usb-30-and-virtual-xhc.html

> If you want to use a USB 3.0 device in a guest which does not support the VMware Virtual xHCI Controller, you can try to plug the USB 3.0 device into a USB 2.0 EHCI/UHCI port on the host, which will force the device to function in USB 2.0 mode. The device can then be connected to the VMware Virtual USB EHCI+UHCI Controller to use in the virtual machine.