---
date: 2019-09-24
title: Microsoft Edge
menu:
    sidebar:
        parent: Applications
---

Microsoft Edge based on Chromium


## Configuring IE Mode
Check `edge://policy` to view activated policies.


### Using RegEdit
```
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge
```
- `InternetExplorerIntegrationLevel` `REG_DWORD` `0 or 1`
- `InternetExplorerIntegrationSiteList` `REG_SZ` `file:///c:/users/gdube/desktop/ie.xml`
    + Use [Enterprise Mode Site List Manager](https://www.microsoft.com/en-us/download/details.aspx?id=49974) to generate the SiteList file.
    + Within Edge, IE Mode will be activated for URLs within the SiteList set to `open-in` `IE11`.



## References
- [Using IE Mode](https://docs.microsoft.com/en-us/deployedge/edge-ie-mode)
- [Policies](https://docs.microsoft.com/en-us/deployedge/microsoft-edge-policies)
- [Add GPO templates for Edge](https://docs.microsoft.com/en-us/deployedge/configure-microsoft-edge)