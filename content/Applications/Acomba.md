---
date: 2020-05-02
title: Acomba
menu:
    sidebar:
        parent: Applications
---


## Open company by default
Shortcut
```
C:\Fortune\Acomba.exe "rep=C:\f1000.dta\CompanyName"
```



## Printing
- Go to printing config > Check [supplier | etc] > Windows personalisé: Enabled
	+ Do for every check type (eg. supplier, etc)?
		- Not sure. For `Cheque fournisseur`, at least.


## GEF
Pour Excel.

- Prompts to install required files.
	+ Requires Admin rights.
- Automatically load the add-in when launching Excel.
	+ Per-user.
	+ `Excel` `>` `Options` `>` `Add-Ins` `>` `C:\Fortune\GEFExcel.xla`
	+ Or, using regedit
		- `HKEY_CURRENT_USER\Software\Microsoft\Office\Excel\Addins`
		- `HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Excel\Options`
		+ `OPEN<x>`
			- `x`: incremental number if multiple `OPEN` keys are defined.
- In every file using the GEF add-in:
	+ Tab `AddIn` / `Compléments`
		- Sociétés 
			+ Fix path
				- Save
  	+ Otherwise, all other options in the tab will be grayed out.



## MAPI
```Fix.reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows Messaging Subsystem]
"CMCDLLNAME"="mapi.dll"
"CMCDLLNAME32"="mapi32.dll"
"MAPIX"="1"
"OLEMessaging"="1"
"CMC"="1"
"MAPIXVER"="1.0.0.1"
"MAPI"="1"
```
May require reboot.



## Tech Support
- Portail PME
	+ Click `Appel de Service`
	+ If nothing happens, save the page as a shortcut, and open it directly in IE.
- Phone Support
	+ `800 862 5922`
	+ Requires our company phoneNo for identification.
- Service Plans
	+ Argent
		- Only callback, no direct call.



## Terminal Server

By default, Acomba permits only one concurrent user to run its app if using Terminal services (RDP). If multiple RDP users attempt to connect at the same time, Acomba will display a related error message. To proceed, you'll need to purchase additional licenses.


### Verification failure
A concurrent user is defined by its IP address used to connect to the RDP host.
Acomba calls `WTSQuerySessionInformation` from the `Wtsapi32` to get a user's `ClientName` and (IP) `ClientAddress`. These informations are given by the RDP app upon connection.

While `mstsc.exe` sets these informations properly, the modern Remote Desktop app from the Windows Store doesn't.

- `ClientName` is half-set.
- `ClientAddress`'s `AddressFamily` is let unspecified, and the IP Address field contains garbage.

Somehow, this bypasses Acomba's RDP-check, meaning that multiple connections can be made to Acomba from RDP users using the modern RDP app, without regard to remote licenses being installed.



### On-Premise permission
Acomba lets its customers off the hook if using RDP from the office (within a local network). Its mechanism to differentiate between a RDP Session from home vs from work is to measure the latency of a ping from its host to the RDP client's IP Address.

It uses `WTSQuery`'s `ClientAddress` to perform the ping.
Ping uses the ICMP protocol, which is an IP mechanism that's lower-level than TCP/UDP, and need to be permitted to pass through Windows' firewall. Both of the following methods can be used to do so:

- `Windows Firewall` 
	+ Allow: `File and Printer Sharing (Echo Request ICMPv4)`
- `Network and Sharing Center`
	+ Enable: `Printer Sharing`.



### Quick Recap
Acomba's RDP/ping validation to enforce a limit on concurrent users:

- If no ClientAddress set: allow connection.
- Else: perform ping
	- If ping blocked or takes to long: enforce limit.
	- Else: allow connection.



## Remonte
- FAQ 292

Pour les entreprises de grande taille, il est bon à l'occasion de réindexer la base de données. Dans les grandes entreprises, un remontage peut prendre plusieurs dizaines de minutes.


### Manually
```
Acomba > Info > À propos > Fonction: "remonte"
```


### Automatically 
Create a scheduledTask set it up with this command:
```
Acomba.exe invr rep=c:\f1000.dta\<society>
```

- WorkingDir: installDir of Acomba (`Fortune` dir).
- If the company/society is opened elsewhere, the command will fail.


### ServiCentre Enterprise Manager
There's a tab in Enterprise Manager to configure its service to schedule and perform an Acomba Remonte. Email notifications can be set as well to report a success/failure.

![](../images/Servicentre-EnterpriseManager-Acomba.png)

Don't forget to restart the service after changing any value (and clicking `Appliquer`) in Enterprise Manager: it seems the service only reads its configuration at launch.