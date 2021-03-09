---
date: 2021-03-09
title: Product Key
menu:
    sidebar:
        parent: Office
---


## Location
- `C:\Program Files (x86)\Microsoft Office\Office16`
- `C:\Program Files\Microsoft Office\Office16`

## Arguments
```
cscript ospp.vbs
```
- `/act`
    + Activate installed apps.
- `/inpkey:<productKey>`
    + Install product key.
- `/unpkey:<last5DigitsOfProductKey>`
    + Uninstall product key.
- `/dstatus`
    + Display license information.
- `/actcid:<ConfirmationID>`
    + Activates using specified ConfirmationID.
- `/dinstid`
    + Displays InstallationID.



## Activation Status
Get activation status, including the last 5 digits of the product key used to install Office.
```
cscript ospp.vbs /dstatus
```


## Activate
Perform activation:
```
cscript ospp.vbs /act
```




## Resources
- [docs.microsoft.com/en-us/deployoffice/vlactivation/tools-to-manage-volume-activation-of-office](docs.microsoft.com/en-us/deployoffice/vlactivation/tools-to-manage-volume-activation-of-office)