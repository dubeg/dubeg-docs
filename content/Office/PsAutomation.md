---
date: 2018-09-26
title: Powershell Automation
menu:
    sidebar:
        parent: Office
---

- COM interface 
   + requires Excel installed.
   + requires "Desktop" directory to be created in the system/profile folder to work in non-interactive mode (no session opened).
- EPPlus (.NET DLL)
   + Doesn't work for xls, only xlsx.

## COM
```
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $true
$book1 = $excel.Workbooks.Add()
$book2 = $excel.Workbooks.Open("path/to/xlsx")
$sheet1 = $book.ActiveSheet
$sheet2 = $excel.WorkSheets.Add()
$sheet3 = $book.Sheets.Item("nameOfSheet")
$cellValue = $sheet1.Range("A1").Text

$sheet1.Cells.Item(1,1) = "value"
$sheet1.Cells.Item(1,1).Font.Bold = $true
$sheet1.Cells.Item(1,1).Font.Size = 16

$sheet.Save()
$excel.Quit()
```

## EPPlus
- github.com/dfinke/ImportExcel
   + `Install-Module ImportExcel -scope CurrentUser`
- github.com/RamblingCookieMonster/PSExcel/
   + `ramblingcookiemonster.github.io/PSExcel-Intro/#get-a-workbook`
- Using EPPlus directly
```
Add-Type -Path "path/to/EPPlus.dll"
$filePath = "path/to/file.xlsx"
[OfficeOpenXml.ExcelPackage]$package = New-Object OfficeOpenXML.ExcelPackage($filePath)
[OfficeOpenXml.ExcelPackage]$book = $package.Workbook
$book.Properties.Author = "dubeg"
$book.Properties.Title = "TitleA"
$book.Worksheets.Add("SheetA") | Out-Null
$sheet = [OfficeOpenXml.ExcelWorksheet]$book.Worksheets[1]
$sheet.Cells.AutoFitColumns()
$sheet.Column(1).Width = 60
$style = $sheet.Ceels["A1:A2"].Style.Fill
$style.PatternType = "Solid"
$style.BackgroundColor.SetColor("Red")

$package.SaveAs($filePath)
$package.Dispose()
```

```
Add-Type -Path "path/to/epplus.dll"
$file = New-Object System.IO.FileInfo("path/to/xlsx")
$package = New-Object OfficeOpenXml.ExcelPackage($file)
$sheet = $package.Workbook.WorkSheet["nameOfSheet"]
$package.Save()
```