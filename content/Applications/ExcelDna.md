---
date: 2020-05-02
title: ExcelDNA
menu:
    sidebar:
        parent: Applications
---

## Debug
By default, every debug / build resets the command line arguments (to `<fileName>.xll`). To disable this behavior:

- In `ExcelDna.Build.props`
    + `RunExcelDnaSetDebuggerOptions`: `false`.
- Restart Visual Studio.
- Project Properties:
	- `Command Line Arguments`: `"<fileName>.xll" "<fileName>.xlsx"`.


## .NET
- Excel stores any number as a double.

- All indexes are one-based (columns, rows, etc).

- Automatic __text-to-number__ conversion
    + Before writing a stringified number to a cell, you need to set its format to text if you intend to keep the value as a string.
    + Otherwise, Excel will store the given value as a number.
    + `Range.NumberFormat = "@"`

- `Range.Value` 
    + May return a double, string or bool if a single cell.
    + Otherwise, it will return `object[,]`. 
        + The lowerbounds will start at 1

- Use `Range.Value2` for performance.
	+ Returns the underlying value (int, object, string etc.).
	+ Faster than .Text/.Value
	+ `.Text`: displayed value (e.g. ####)
	+ `.Value`
        + Formatted value (currency format may truncate decimals, etc.)
        + Supports `DateTime`, `decimal` for currency.

```csharp
// Works
Range["A1", "E1"].Value2 = new object[] { 1, 2, 3, 4, 5};
Range["A1", "E1"].Value2 = new object[] { 1, 2, 3, 4, null};

// Works, but last cell contains "N/A" error.
Range["A1", "E1"].Value2 = new object[] { 1, 2, 3, 4 }; 

// Works, but both rows are set to 1, 2, 3 (4, 5 were ignored)
Range["E1", "G2"].Value2 = new object[] { 1, 2, 3, 4, 5};

// (Row: 1, 2, 3) (Row: 4, 5, 6)
Range["E1", "G2"].Value2 = new object[,] { {1,2,3}, {4,5,6} };

// Error
Range["R1C1", "R1C5"].Value2 = ...
```



## Deployment
Distribute the add-in files:

+ `<Name>-AddIn-packed.xll`
+ `<Name>-AddIn64-packed.xll`

__Considerations__

- DLL dependencies
    + Distribute them along the `.xll`,
    + Or specify `<Reference Path=<path> Pack='true />` in the `.dna` file before compiling. 
- `app.config`
    + Packed in the `<...>-packed.xll` automatically.


## Loading in Excel

1. Open Excel, then open the appropriate `.xll` file. 
    + The add-in should now be loaded for the session.
1. Load on launch
    + Go to `Add-Ins`.
	   - Alt + T, I
	   - Or `File` `>` `Options` `>` `Add-Ins` 
    + Browser & select the `.xll`


1. Load with VBA
    + `ALT + F8`
    + Set the following code:
```
Option Explicit
Dim isAddinLoaded As Boolean

Private Sub Workbook_Activate()
    If (isAddinLoaded) Then
        Exit Sub
    End If
    isAddinLoaded = Load()
End Sub

Function Load() As Boolean
    Dim xllFileName As String
    xllFileName = "xxx-AddIn-packed.xll"
    If Is86 = False Then
        xllFileName = "xxx-AddIn64-packed.xll"
    End If
    Load = Application.RegisterXLL(ThisWorkbook.Path & "\" & xllFileName)
End Function

Function Is86() As Boolean
    Is86 = True
    #If Win64 Then
        Is86 = False
    #End If
End Function
```


## Assign a macro
To assign a command from an add-in to a button in Excel,
you must load the add-in before setting the name. Otherwise, Excel will prefix the name of the macro with the workbook name, which won't work.



## Command Buttons
__DUBEG: I didn't test this yet.__

Vbe: Microsoft Visual Basic for Applications Extensibility

References:

- Microsoft.VisualBasic
- Microsoft.Vbe.Interop
- Microsoft.Vbe.Interop.Forms

Using:

- using Microsoft.VisualBasic.CompilerServices;
- using Vbe = Microsoft.Vbe.Interop.Forms;


Sample
```
Excel.Shape cmdButton = sheet.Shapes.AddOLEObject(
    ClassType: "Forms.CommandButton.1", 
    Link: false, 
    DisplayAsIcon: false,
    Left: btnRange.Left,
    Top: btnRange.Top,
    Width: btnRange.Width,
    Height: btnRange.Height
);
//cmdButton.Name = "btnClick";
Vbe.CommandButton CmdBtn = (Vbe.CommandButton)NewLateBinding.LateGet(
   sheet, null, "btnClick", null, null, null, null);
CmdBtn.Caption = "Click Me";
CmdBtn.Click += new Vbe.CommandButtonEvents_ClickEventHandler(() => { });
```