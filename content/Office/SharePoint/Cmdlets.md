# Cmdlets
```
Import-Module SharePointPnPPowerShellOnline
Connect-PnPOnline https://ad.sharepoint.com/sites/SiteName
Get-PnPField -List "Clients" | ? Title -like "*Site*"

# InternalName (the id column has "Title" as its InternalName)
# Title (DisplayName)
```