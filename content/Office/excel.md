---
date: 2018-09-26
title: Excel
menu:
    sidebar:
        parent: Office
---


## Open Excel in its own instance
In Excel 2016, when you open a workbook through File Explorer, or open Excel through the Start Menu, a new window will open as part of an existing Excel instance if one exists.

What's annoying is that the new window is opened in the same Virtual Desktop as the last active window of the existing Excel instance, as opposed to the Virtual Desktop that you're currently in.

The Excel executable defines a bunch of command-line [switches](https://support.office.com/en-us/article/079164cd-4ef5-4178-b235-441737deb3a6), but we're interested in the `/x` switch. It opens a separate Excel instance, and keeps us in our current virtual desktop. We'll use this switch in the solutions below.



### File Explorer

__With Office 365 installed via the Windows Store:__

- Open regedit.
- In HKEY_CLASSES_ROOT (HKCR), find the `.xlsx` key.
+ You'll find a key named `OpenWithProgIds` underneath.
    + ![](../images/Excel-Open.PNG)
+ There will be an oddly named value in this key: `AppXXX`.
    + ![](../images/Excel-Open2.PNG)
- Search for a key of the same name under HKCR.
- Drill down to the `open` key.
    + ![](../images/Excel-Explorer.PNG)
- Prefix the `Parameters` value with `/x`.
    + ![](../images/Excel-Keys.PNG)


__With Office 2016 installed via an executable:__

In regedit, you'd still find the `.xlsx` key first, but there would be an `Shell` and `open` key directly underneath it. I'm not certain since I don't have it installed in this way.


### Start Menu
- Press Win key.
- Type: `excel.exe /x`
    + ![](../images/Excel-Start.png)




## Dollar sign ($)
To address a cell in a formula, (ex: `A1`), we specify the column and row.

To keep the same column or row in the address when expending the formula to adjacent cells, we use the dollar sign `$`.

__Examples:__

- `$D3`: col is pinned.
- `D$3`: row is pinned.
- `$D$3`: both are pinned.



## Lookup key-value
- `VLOOKUP`
- `RECHERCHEV`

This function tries to find a key in a range of cells, and can return any adjacent cell in the same row.

```
VLOOKUP (
    CellOfKey, 
    Range, 
    CellPositionOfValueToReturnInRange,
    UseClosestMatch
) 
```

- `CellOfKey`
    + Address of cell containing the key to find.

- `Range`
    + Range of cells in which the key-value pair exist.

- `CellPositionOfValueToReturnInRange`
    + Specifies the column in the range that contains the value to return.
    + Columns are numbered 1..N, starting from the leftmost column in the range.

- `UseClosestMatch`
    + When the key is a number, this option's effect is odd. Just google it.
    + When the key is a string, and you're looking for a partial match, use exact match (`UseClosestMatch = false`) with wildcards (asterisk: `*`) instead.



## Conditional Formatting
In conditional formatting rules, cell references are relative to the top-left most cell in the applied range. So, when making a new rule, you can simply pretend as if you are writing a formula for the top-left cell only, and Excel will "copy" your formula to all other cells in the selected range.

- Formula: `=...`
- Or: `=OR(A, B, ...)`
- And: `=AND(A, B, ...)`
- Not: `=NOT(A, B, ...)`



## Keyboard Shortcuts
1. Expand selection
    + `CTRL + SHIFT + Arrow`
    + If current cell is NOT empty:
        + Expand selection in the given direction until reaching an empty cell.
    + If current cell is empty:
        + Expand selection in the given direction until reaching a filled cell.
    + If SHIFT is omitted, only last cell is selected.

2. Paste special
    + `CTRL + ALT + V`
    + Displays advanced paste option before pasting.

3. Toggle filters
    + `CTRL + SHIFT + L`

4. Select All
    + `CTRL + A`
    + Expand selection to adjacent cells.
    + It tries to  be smart about empty cells.
5. Edit cell
    + `F2`
    + Enter edit mode in current cell.

6. Format cell
    + `CTRL + 1`
    + Displays Formatting window for current cell.

7. Toggle display formulas in cells
    + ``CTRL + ` ``
    + Display formulas within cells.
    + In standard mode, formulas are display in the formula bar below the ribbon.