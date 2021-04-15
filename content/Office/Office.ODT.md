---
date: 2021-03-09
title: ODT
menu:
    sidebar:
        parent: Office
---

Office Deployment Tool

- [Docs](docs.microsoft.com/en-us/deployoffice/overview-office-deployment-tool)
- [Changelog](docs.microsoft.com/en-us/officeupdates/odt-release-history)
- [Download](www.microsoft.com/en-us/download/details.aspx?id=49117)

The Office Deployment Tool (ODT) is a command-line tool that you can use to download and deploy Click-to-Run versions of Office to your client computers.





## Setup.exe
- Args
    + `/configure`: install downloaded Office apps, or remove/update installed apps.
    + `/download`: downloads to a folder.
    + `/customize`: apply new preferences to installed apps.



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
        - Monthly
        - PerpetualVL2019
    + Version
        - Eg. `16.0.6741.2056`
    + SourcePath
    + DownloadPath
        * When specified, Version is required.
- Product
    + ID
        - O365ProPlusRetail
        - VisioProRetail
        - ProPlus2019Retail
        - ProPlus2019Volume
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
- Cmd: `setup.exe /configure config.xml`

config.xml
```
<Configuration>
  <Add OfficeClientEdition="64" MigrateArch="TRUE">
  </Add>
</Configuration>
```