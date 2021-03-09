# Office ODT
- Docs: docs.microsoft.com/en-us/deployoffice/overview-office-deployment-tool
- Changelog: docs.microsoft.com/en-us/officeupdates/odt-release-history
- Download: www.microsoft.com/en-us/download/details.aspx?id=49117

The Office Deployment Tool (ODT) is a command-line tool that you can use to download and deploy Click-to-Run versions of Office to your client computers.



## Migrate from x86 to x64
- Cmd: `setup.exe /configure config.xml`

config.xml
```
<Configuration>
  <Add OfficeClientEdition="64" MigrateArch="TRUE">
  </Add>
</Configuration>
```