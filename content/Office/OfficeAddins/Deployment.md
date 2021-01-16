---
date: 2020-07-31
title: AddIns - Deployment
menu:
    sidebar:
        parent: Office
---

Deploying an add-in is a two-step process.

- Deploy the addin's manifest.xml 
	+ To a SharePoint App Catalog.
	+ To a Microsoft 365 organization using Centralized Deployment
		- Admin Center > Services & Add-ins (available through a search) > Deploy Add-In > Upload manifest.xml
		- Admin Center > Settings (sidebar) > Integrated Apps > "Add-Ins"
	+ To the Office Add-Ins' catalog (called AppSource, available to the public).
- Host the addin's html/css/js files with any webserver
	+ On Azure
		- App Service (if dynamic site)
		- Static Website (if static files only)
	+ Somewhere else.



## Azure Static Website
To host a basic TaskPane add-in, you just need a webserver that serves static files. Weird that add-ins containing only static files aren't managed by Microsoft 365 itself, but I guess Office Scripts (in public preview only for subscriptions including the Office desktop apps) will fill that need in the future.

So, setup an Azure Static Website connected with github, and modify the webpack config to copy to the "dist" folder a default index.html file (the Azure side refuses a deployment if it doesn't contain an "index.html" file), and to copy the assets folder as well because it is referenced in the generated manifest.


Parameterize the Github Action (workflow file) created by Azure that was added to your repository:

- App location: `/`
- Api location:
	+ _Let this parameter empty._
- Artifacts location: `/dist`