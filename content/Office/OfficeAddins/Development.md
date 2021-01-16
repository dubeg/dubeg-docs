# Excel Online - Scripting
- Name: Office Add-ins
- Distributed via a store|catalog.
- Sideloading
	+ For dev, sideloading an add-in is possible, without having to put it in an add-in catalog.
	+ When sideloaded, manifest is stored in the browser's local storage.
	+ Office on the web
		- Open document, 
		+ Switch to Insert tab,
		+ Click "Office Add-ins".
		+ Select "MY ADD-INS" -> "Manager My Add-ins" -> "Upload My Add-in"
		+ Select the add-in manifest.
		+ Add-in should be loaded, ie. ribbon on contextMeny add-in items should be present.
	+ Office Desktop
		- 

- github.com/OfficeDev



## Manifest
- ID
- DisplayName
- Description
- Version
- DefaultLocale
- Brand images/icons
- Dimensions (?)
- Integrations with Office Apps (Excel, Word, etc.)
	+ Target Office app
	+ Ribbon buttons,
	+ Add-in commands, 
	+ task panes, 
	+ etc.
- Permission Level / Data Access requirements



## Web App
Either static HTML page, or any client/server apps (ASP.NET, PHP, Node.js).

To interact with Office Apps and documents, the Office.js Javascript APIs is used.

- Extend Office
	* Custom UI are specified in the add-in manifest.
	+ Ribbon buttons
	+ ContentMenu items
	+ Add-in commands
		- Launch a task pane w/ HTML
		- Execute JS function.
		- Can be displayed in the ribbon or contextMenu.
		- Not available in Office 2016 and prior.
		- Available in Office 2019 and later.
	+ Task Panes
		+ Can be configured to display automatically when a user opens a file.
		  User needs the add-in installed prior to opening a file.
	+ Functions available within Excel cell.

- Embed web-based objects
	+ Content add-ins in Excel or PowerPoint.
	+ Data visualizations
	+ Media
	+ Other



## APIs
Javascript API representing the common object model shared by Excel, Outlook, Word, PowerPoint, OneNote, Project.
Also, host-specific models for Excel, Word.

- Office 2016: 
	- docs.microsoft.com/en-us/office/dev/add-ins/reference/requirement-sets/excel-api-1-1-requirement-set

Excel
+ Worksheets
+ Ranges
+ Tables
+ Charts
+ ...

Common
+ UI
+ Dialogs
+ Client settings

Custom functions in cells use a slightly different programming model.


Using the production APIs (from CDN)
```
<script src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>
<script>
Office.onReady(function() {
  // Office is ready.
  $(document).ready(function () {
    // document is ready.
  });
});
</script>
```

When you work with a document, requested read or write actions are batched up using a proxy object. Your API calls don't actually read or update the underlying document until you call the sync() method.

Before you can read the properties of a proxy object, you must load the properties to populate the proxy object with data from the Office document. You do this by calling the load() method on the proxy object for any properties you need. Then call the context.sync() method, which will load all of the requested properties. 






## Dialogs
- Sign into an integrated service (MS, Google, Facebook account)
- Confirm the user's action.
- Run a task such as viewing a video.
- Not modal, ie. user can continue interacting with the Office app.



## Sideload in Excel Desktop
Manifest automatically loaded by Excel is referenced in the following key.
I think a nodeJs script is creating this regKey when we execute "npm start" in a project created using `yo office`.
```
HKCU\Software\Microsoft\Office\16.0\WEF\Developer
```
