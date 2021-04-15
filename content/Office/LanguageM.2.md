# Power query M Language
## Datatypes
- Binary:  00 00 00 02 // number of points (2)
- Date:  5/23/2015
- DateTime:  5/23/2015 12:00:00 AM
- DateTimeZone:  5/23/2015 12:00:00 AM -08:00
- Duration:  15:35:00
- Logical:  true, false
- Null:  null
- Number:  0, 1, -1, 1.5, and 2.3e-5
- Text:  "abc"
- Time:  12:34:12 PM

## Operations
Addition: + 
Combination: &
```
"A" & "BC" = "ABC"
{1} & {2, 3} = { 1, 2, 3 }
[ a = 1 ] & [ b = 2 ] = [
    a = 1,
    b = 2
]
```
Logical
```
a < b
a = b
a <= b
a >= b
a <> b
a or b
a and b
not a
```

## Structured data values
Record
```
let
    RecordA = [
        FieldA = "a",
        FieldB = 1
    ],
    FieldA = RecordA[FieldA] // Get value of RecordA.FieldA.
    ...
```

List
```
let 
    ListA = { 1, 2, 3 },
    ListB = { 1, "2", true }
    FirstOfListA = ListA{0} // Get value of ListA's first element.
    ...
```

Table
```
let  
    TableA = #table(   
        { "ColumnA", "ColumnB" },
        // Rows
        {   
            { 1, "First" },
            { 2, "Second" }
        }
    ),
    // ----
    // Create a table with 
    // explicit columns.
    // ----
    TableB = #table(  
        type table [
            OrderID = number,
            CustomerID = number,
            Item = text,
            Price = number
        ],   
        {   
            { 1, 1, "Fishing rod", 100.00 },
            { 2, 1, "1 lb. worms", 5.00 }
        }  
    ),
    RowOfTableB = TableB{0}
```


## Functions
```
// Explicit & implicit types.
Add = (x as number) as number => x + 1
Add = (x) => x + 1
```


### Each
The each keyword is used to create simple functions.
It's syntactic sugar for:
```
(_) => ...
```

It's especially useful with the lookup operator, which is applied by default to _.
```
// Both are equivalent.
each [FieldName]
each _[FieldName]
```

## Underscore _
The underscore is the default name given to a single parameter.
It's really only (or just mostly?) used in the case of "each".

Examples
```
// Both are equivalent.
each _ + 1
( _ ) => _ + 1
```