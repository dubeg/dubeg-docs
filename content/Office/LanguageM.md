---
date: 2018-09-26
title: Language M
menu:
    sidebar:
        parent: Office
---

# Language M 
Power Query language.


## Data types
- `null`
- `logical` (true | false)
- `number` 
- `time` 
- `date` 
- `datetime`
- `datetimezone`
- `duration`
- `text`
- `binary`
- `type`
- `list`
- `record`
- `table` 
- `function` 
- `anynonnull` (all values excluding null)



## Operators

Combination: `&`

- Strings: `"A" & "B" => "AB"`
- Lists: `{1, 2, 3} & {4} => {1, 2, 3, 4}`
- Records: `[a=1] & [b=2] => [a=1, b=2]`


Logic

- `or`
- `and`
- `not`
- `=`
- `<>`
- `<=`
- `>=`
- `<`
- `>`


Conditionals
```
=if [A] <> null or [A] = "" then "OK" else "BAD"
```


Nested if
```
if [A] = null or [A] = "" then "Null"
else if [A] = "-" then "-"
else "OK"
```


Record lookup (`[]`)  
Access the fields of a record by name.
```
```


List lookup (`{}`)  
Access an item in a list by its zero-based index.
```
{ "A", "B", "C"}{0}
```


## Structures
- Record
    + Set of fields.
    + Field is a name/value pair.
    + Name: unique string within the record.
    + Syntax for record allow names to be specified without quotes,
      a form also referred as identifiers.
    + Ex: `[ ID = 1, Name = "gdube", Age = 5 ]`
    + Access the fields of a record by name.
        - Ex: `[ Name = "gdube" ][Name] `
- List
    + Zero-based ordered sequence of values.
    + Can contain different datatypes.
    + Ex: `{ 1, 2, 3 }`
    + Access an item in a list by its zero-based index.
        - Ex: `{ "A", "B", "C"}{0}`



## Convertion
- Number.FromText(text)
- Number.ToText(number)
- Text.From(any)  
- ...


## Notes
Pivot: 
 ColumnA's values will become columns.
 ColumnB's values will be the respective values for the new columns.

Table.Pivot(
    tableA,
    pivotValues,           -- a set of values which will become the new columns.
    attributeColumn,       -- column containing the pivotValues.
    valueColumn,           -- column containing the values to be put in the new columns.
    [functionOfAggregation]-- function to aggregate the values (in valueColumn).
)

Table.Group(
    tableA,
    keyColumn(s),        -- group by these columns
    aggregatedColumn(s), -- columns to be aggregated
    [groupKind],         -- Global (default) or Local
    [comparer]           -- compare equality between groups
)
Remarks
- Foreach group, a row is created with the key and the aggregated values. 
- Local: group formed from consecutive sequence of rows with the same key.
- Global: group formed from all rows with the same keys.
- Ex: 
    # Table: Items
    # Columns: Key, Item, Price
    Table.Group(Items, {Key}, {"Name of new column", each List.Sum([Price])})

Record.FromList(values, fieldNames)


## StackOverflow Example
```
// ---------------------
// TableA:
// - ID,
// - Attribute1,
// - Attribute2
// ---------------------
let
    tableA = Excel.CurrentWorkbook(){[Name = "TableA"]}[Content],

    // -----------------------------------------
    // Get distinct values in ColumnA.
    // Get number of unique values in ColumnA.
    // -----------------------------------------
    lettersABC = List.Distinct(tableA[Attribute1]),
    count = List.Count(lettersABC),

    // -----------------------------------------
    // Get headers for new columns "LetterX".
    // Get headers for new columns "NumberX".
    // -----------------------------------------
    lettersNUM = List.Transform({1..count}, each "Letter" & Number.ToText(_)),
    numbersNUM = List.Transform({1..count}, each "Number" & Number.ToText(_)),

    // ---------------
    // Group by ID
    // ---------------
    group = Table.Group(tableA, {"ID"}, {
        {"attr", each Record.FromList(lettersABC & [Attribute2], lettersNUM & [Attribute1]) }
    }),
    exp = Table.ExpandRecordColumn(group, "attr", lettersNUM & lettersABC, lettersNUM & numbersNUM)
in
    exp
```


## Text literal
```
"A string."
```

- Can span multiple lines.
- Surrounded by double-quotes.



Escape codes to be used within an escape sequence: `#(<code>)`

- `cr` (Carriage Return)
- `lf` (Line Feed)
- `tab` 

```
"A string with #(cr)#(lf) a new line."
"A string with #(cr,lf) a new line."
```

Within the escape sequence, no whitespace is allowed.


## Retrieve value from Excel Sheet
- Excel.CurrentWorkbook() as table
    + Returns a table containing the tables/namedRanges of the current workbook.
        + Columns
            + Name (string)
            + Content (table)
                * Table: columns are named as-is in the sheet.
                * NamedRanges: columns are automatically named "Column1", "Column2", etc.
```
let
    Source = Excel.CurrentWorkbook(){[Name="Table1"]}[Content],
    #"Changed Type" = Table.TransformColumnTypes(Source,{{"Column1", Int64.Type}}),
    Column1 = #"Changed Type"{0}[Column1]
in
    Column1
```


## SQL Parameters
There's no real way to create a parameterized SQL query in Power Query,
excepting manipulating the query string.

This has the down side of prompting the user after every change of a parameter's value.
There's a toggle to disable this behavior, but it's probably not recommended (?).