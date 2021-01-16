---
date: 2018-08-17
title: SSRS
menu:
    sidebar:
        parent: Applications
---



## Blank pages when no pagebreak set
Verify that..
(Body + Left margin + Right margin) <= Page Width

## Visual mismatch
- Excel export may had very small blank rows/columns to visually match the report. To avoid that, remove some decimals of the size of the report.
- An hidden row won't take space in the rendered page.

## Expressions
- Functions in expressions are always evaluated, even though you do the following:
```
    IIF( IsNothing(Fields!Addr.Value), "", Code.FunctionDoStuff(Fields!Addr.Value) )
```
So, if 'Fields!Addr.Value' is NULL, the 'FunctionDoStuff' must handle a NULL value passed as the parameter. Otherwize it causes an error to be thrown.


## Tablix
- Keeping multiple rows of DETAILS group in SAME page => Add Rectangle in a DETAILS row, Add controls you want to keep on same page IN the rectangle.
- Repeat Headers (static textboxes) => Click Advanced Mode IN Group Pane, 
                                       Click static field,
                                       Set RepeatOnNew = TRUE,
                                       Set KeepWithGroup = AFTER
- Static Size Textbox => set CanGrow   = FALSE,
                         set CanShrink = FALSE
- Static Size Rectangle => Add Textbox,
                           Set Height = Rectangle's Height

Within a Tablix, the property Textbox.CanShrink is never honored.
However, Textbox.CanGrow is always honored, so the trick is to reduce the textbox's height to a minimal value, so it
can then grow to fit the content. The opposite, setting the height bigger than its content, won't work since the textbox won't shrink.


## Aggregates
To use an aggregate of a (containing) group inside one of its child group,
specify:
```
=SUM(Fields!NameOfField.Value, "NameOfScope")
=SUM(Fields!Qte.Value, "NameOfParentGroup")
```
Important: 
    Use the function on the property Value of a field, otherwise it won't work.

## Group variables
In the expression editor, group variables might not be visible.
However, it's still possible to use them in Expressions.

```
= Variables!GroupVariable.Value
```

## Column Group Aggregate
Let's say you have a column group, and want to have a column "Total" at the end of it.
Limitations:
- You can't have an aggregate of an aggregate.
- Conditional aggregate (SUM(IIF)) can be so slow that it's not worth doing on the report-side. Bake it in the SQL query instead.

## Fonts
To view font in HTML viewer, install font on clients.
To embed font in PDF, 
- make sure the font is embeddable (Properties in ControlPanel\Fonts, Details panel).
- make sure the font is installed on the machine hosted SSRS, and the machine rebooted afterwards.

An alternative for barcodes:
- draw the font as images: https://www.codeproject.com/Articles/789254/How-to-embed-Barcodes-in-your-SSRS-report
- set "Convert font to binary image", or something similar, in the printer's properties.

## Background Color
No Color: to use the NoColor, instead of using "Transparent", which will generate a warning for god knows why, use Nothing.

Report Code:
```
Function GetBackgroundColor(cellValue AS Decimal) AS String
    If (cellValue < 0) Then
        Return "#F36E6E"
    Else
        Return "LightGreen"
    End If
End Function
```

Expression of Textbox.Fill:
```
=Code.GetBackgroundColor(Me.Value)
```

## Numeric Format
- "0"
    + Name: zero placeholder
    + Desc: replaces the placeholder with the corresponding digit if present.
            Otherwise, 0 appears in the result string.
- "#"
    + Name: digit placeholder
    + Desc: replaces the placeholder with the corresponding digit if present and/or is
            a significant zero.
            Otherwise, nothing appears in the result string.


## Freeze rows
About the HTML Viewer: Row Groups -> Advanced Mode, then click on any "Static" item. In properties, set FixedData = true.


## Double horizontal scrollbars in IE11/SSRS2008 in Report Manager
First, make sure IE is set to compatibility mode.
Second, in the following file, add `overflow-x: hidden` in body class.
Path: 
```
C\Program Files\Microsoft SQL Server\MSRS10_50.MSSQLSERVER\Reporting Services\ReportManager\Styles\ReportingServices.css
```


Additional notes:
```
Report Manager: http://reporting/Reports/
Report Server : http://reporting/ReportServer/
```




## Printing Problem
User cannot print from the HTML report viewer.
When trying to print a report, the user receives the following message:
"Impossible de charger le controle d'impression du client".


### Solution 1: Active the add-on
Path: Internet Explorer -> Internet Options -> Programs -> Manage add-ons -> Show: all add-ons
Verify that RSClientPrint2008 Class is enabled.
Admin privileges may be required to enable the add-on.


### Solution 2: Download the add-on
With admin privs, try to print the report.
The add-on may install itself automatically if the user has admin privileges on the local computer.