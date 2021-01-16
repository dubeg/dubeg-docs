---
date: 2020-07-31
title: AddIns - Demo
menu:
    sidebar:
        parent: Office
---

- docs.microsoft.com/en-us/office/dev/add-ins/tutorials/excel-tutorial
	+ Create table
	+ Filter and sort table
	+ Create chart
	+ Freeze table header
	+ Open a dialog


## Install
```
npm install -g yo generator-office
yo office
# Choose a project type: Office Add-in Task Pane project
# Choose a script type: Javascript
# What do you want to name your add-in? My Office Add-in
# Which Office client application would you like to support? Excel
```


## Develop
Taskpane.html
```src/taskpane/taskpane.html
<button class="ms-Button" id="<id>">Click</button>
```

Taskpane.js
```src/taskpane/taskpane.js
// ---------------------------
// Determine if the user's version of Office 
// supports all the Office.js APIs used
// ---------------------------
if (!Office.context.requirements.isSetSupported('ExcelApi', '1.7')) {
    console.log('Add-in uses Excel.js APIs that arent available in this version of Office.');
}
document.getElementById("<id>").onclick = fnName;
function fnName() {
    Excel.run(function (context) {
        // TODO: logic
        return context.sync();
    })
    .catch(function (error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    });
}
```

## Test locally
```powershell
npm start 
# Or, for Office Web
npm run start:web
```
Then, sideload the add-in (using the manifest only?).
