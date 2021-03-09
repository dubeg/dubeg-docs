---
date: 2021-03-09
title: Rollback
menu:
    sidebar:
        parent: Office
---

Rollback to a previous version
```
"C:\Program Files\Common Files\microsoft shared\ClickToRun\OfficeC2RClient.exe"
	/update user updatetoversion=16.0.11629.20196
```


## Build Numbers
https://docs.microsoft.com/en-us/officeupdates/monthly-channel-2019 and update the command line. 



## Word (C2R Retail)
Microsoft Word 2016
- 16.0.1228.20100, 32-bit
- Version 1911 (Build 12228.20364 Click-to-Run)
- Control Panel: 16.0.12228.20364

Previously

- Version 1911 (12228.20364) Dec 10
- Version 1910 (12130.20410) Nov 22
- Version 1910 (12130.20390) Nov 18
- Version 1910 (12130.20344) Nov 12
- Version 1909 (12026.20320) Oct 8
- Version 1908 (11929.20300) Sept 10

Experiment
```
cd "C:\Program Files\Common Files\microsoft shared\ClickToRun"
.\OfficeC2RClient.exe /update user updatetoversion=16.0.12026.20320
```


## Office Versions
- Office 2007: 12.0
- Office 2010: 14.0
- Office 2013: 15.0
- Office 2016: 16.0
- Office 2019: 16.0



## OfficeClickToRun.exe
```
OfficeClickToRun.exe
	scenario=Repair
	platform=x86
	culture=en-us
	RepairType=FullRepair
	DisplayLevel=False
```

- scenario
	+ Repair
	+ Mandatory
- platform
	+ x86|x64
	+ Mandatory
	+ Need to specify the platform version of Office.  x86 is for the 32-bit version of Office. x64 is for the 64-bit version of Office. 
- culture
	+ ..-cc
	+ Mandatory
	+ Need to specify the language identifier for the version of Office that is installed .  If multiple languages are installed, just need to specify one of the languages and not all.  For example, if English Office is installed the ll-cc value will be en-us.  
		- en-us
		- fr-ca
- forceappshutdown
	+ True|False
	+ Optional
	+ If set to True will close all Office applications prior to running the Repair.  If Office applications are open and forceappshutodwn is not used or set to False, the Repair will fail. 
+ RepairType
	+ QuickRepair|FullRepair
	+ Optional
	+ This specifies if the user is going to run a Quick repair (QuickRepair) or an Online Repair (FullRepair).  Note - if running an Online repair, all Office applications will be reinstalled and will override any settings made in the configuration.xml file. 
+ DeplayLevel
	+ True|False
	+ Setting the DisplayLevel to True will show a full UI and setting it to False will make the UI silent. Optional

## OfficeC2RClient.exe
```
OfficeC2RClient.exe
	/update user
	variable1=value
	variable2=value
	...
	variableN=value
```

- updatepromptuser
	+ True|False
	+ default: false
	+ Specifies whether the user will see this dialog before automatically applying the update.
- forceappshutdown
	+ True|False 
	+ default: false
	+ This specifies whether the user will be given the option to cancel out of the update. However, if this variable is set to True, then the applications will be shut down immediately and the update will proceed.
- displaylevel
	+ True|False
	+ default: true
	+ This specifies whether the user will see a user interface during the update. Setting this to false will hide all update UI (including error UI that is encountered during the update scenario).
- updatetoversion
	+ x.x.x.x (build number)
	+ default: install latest release.
	+ This specifies the version to which Office needs to be updated to.  This can used to install a newer or an older version than what is presently installed.




## References
- https://docs.microsoft.com/en-us/officeupdates/update-history-office-2019
	* Update history for Office 2016 C2R and Office 2019
		* Retail versions of Office 2016 C2R and Office 2019

- http://web.archive.org/web/20190419144914/https://blogs.technet.microsoft.com/odsupport/2014/page/2/