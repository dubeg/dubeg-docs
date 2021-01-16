---
date: 2019-07-02
title: ODBC DSN
menu:
    sidebar:
        identifier: odbc-dsn
        parent: Windows
---

Open Powershell as admin.


## Install Driver
Even though it is said since 2011 in Microsoft docs that odbcconf.exe is deprecated and will be removed from a future version of Windows, it is still included with Windows 10 today (version 1903).

Use 64-bit `odbcconf.exe` if the driver is 64-bit. Otherwise, use 32-bit `odbcconf.exe`.

```powershell
$odbcconf32 = Resolve-Path $env:SystemRoot\SysWow64\odbcconf.exe;
$odbcconf64 = Resolve-Path $env:SystemRoot\System32\odbcconf.exe;

& $odbcconf32 INSTALLDRIVER "DriverName|driver=C:\path\driver.dll"
```



## Create DSN

Using odbcconf.exe.
```powershell
& $odbcconf32 CONFIGSYSDSN "DriverName" "DSN=DsnName | Host=HostName | Port=PortNumber | ..."
```



Using the WDAC module.  
_Included with Powershell 4+, from Windows 8 (2012)._

```powershell
Add-OdbcDsn `
    -DsnName "DsnName" `
    -DriverName "DriverName" `
    -DsnType System `
    -Platform 32-bit `
    -SetPropertyValue @("Address=HostName,Port", "Database=DbName", ...)
```

- Platform
    + 32-bit
    + 64-bit
- DsnType
    + System
    + User



## References
- https://docs.microsoft.com/en-us/powershell/module/wdac/
- https://docs.microsoft.com/en-us/previous-versions/windows/desktop/wdacwmiprov/msft-odbcdriver
- https://docs.microsoft.com/en-us/sql/connect/odbc/dsn-connection-string-attribute
- https://docs.microsoft.com/en-us/sql/odbc/reference/install/data-source-specification-subkeys
- https://docs.microsoft.com/en-us/sql/relational-databases/native-client/applications/using-connection-string-keywords-with-sql-server-native-client