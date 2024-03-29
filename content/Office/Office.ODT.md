---
date: 2021-03-09
title: ODT
menu:
    sidebar:
        parent: Office
---

Office Deployment Tool

- [Docs](http://docs.microsoft.com/en-us/deployoffice/overview-office-deployment-tool)
- [Changelog](http://docs.microsoft.com/en-us/officeupdates/odt-release-history)
- [Download](http://www.microsoft.com/en-us/download/details.aspx?id=49117)

The Office Deployment Tool (ODT) is a command-line tool that you can use to download and deploy Click-to-Run versions of Office to your client computers.





## Setup.exe
- Args
    + `/configure`: install/remove/update (& download if needed) Office apps.
    + `/download`: downloads Office apps to a folder, for installing later.
    + `/customize`: apply settings to installed apps.



## Configuration
- [Docs](http://aka.ms/ODT)

```
<Configuration>
    <Add OfficeClientEdition="64" Channel="xxx">
        <Product ID="xxx">
            <Language ID="en-us" />
            <ExcludeApp ID="xxx" />
        </Product>
    </Add>
    <Remove>...</Remove>
    <!-- 
    <RemoveMSI All="True" />
    <Display Level="None" AcceptEULA="TRUE" />
    <Property Name="AUTOACTIVATE" Value="1" />
    <AppSettings>
    <User Key="software\microsoft\office\16.0\excel\security"
        Name="vbawarnings" 
        Value="3" 
        Type="REG_DWORD" 
        App="excel16" 
        Id="L_VBAWarningsPolicy" />
    </AppSettings>
    -->
</Configuration>
```
- Add
    + OfficeClientEdition
        - 64
        - 32
    + Channel
        - Current (Might be several updates each month)
        - Monthly (Update once a month)
        - SemiAnnual (Every 6 months, Semi-Annuel Enterprise Channel)
        - PerpetualVL2019 (2019 Pro Plus Volume)
    + Version
        - Eg. `16.0.6741.2056`
    + SourcePath
    + DownloadPath
        * When specified, Version is required.
- Product
    + ID
        - O365ProPlusRetail (latest)
        - ProPlusRetail (2016)
        - ProPlus2019Retail (2019)
        - ProPlus2019Volume
        - VisioProRetail
        - VisioPro2019Volume
        - ProjectPro2019Volume
- ExcludeApp
    + Groove
    + OneNote
    + OneDrive
    + Lync
    + Publisher
    + Access
    + PowerPoint
    + Excel
    + Outlook
    + Word




## Migrate from x86 to x64
- `setup.exe /configure config.xml`

config.xml
```
<Configuration>
  <Add OfficeClientEdition="64" MigrateArch="TRUE">
  </Add>
</Configuration>
```