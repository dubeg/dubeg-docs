---
date: 2020-07-31
title: VBA
menu:
    sidebar:
        parent: Office
---


## Datatypes
- Variant
	+ Any numeric value up to range of double.
	+ Same range as variable-length string.
- Boolean
- Byte
- String
- Decimal
- Single
- Double
- Integer
- Long
- LongLong
- Currency
- Date
- LongPtr
- Object
- Dictionary
- Collection



## Comment
```
' This is a comment.
```



## Variables
```
Dim x as double
x = 1

set objectA = objectB
set objectA = Nothing
```



## Function
- Function
	+ Returns value.
	+ Called with parentheses.
- Sub
	+ Returns void.
	+ Called without parenthesis.

```
Function fnName(x as double, y as double) as double
	fnName = <value>
End function
```


```
Sub subName(x as double, y as double)
	<body>
End sub
```



## Call
```
z = fnName
z = fnName()
z = fnName(x, y, z)

subName
subName()
subName x, y, z

Call subName
Call subName(x, y, z)
```

If you always call self-contained procedures with the Call keyword,
you can forget the parenthesis rules, because then you can always use
them without error.

Without the Call keyword with Subs, parenthesis around parameters force their evaluation.

When you put parentheses around an object, VBA evaluates that object and, absent a property, returns the default property.

Textbox evaluates to .Text (default prop).



## Excel
```
Application.Quit

Worksheets.Add 
```



## Convertion
- CBool
- CByte
- CCur
- CDate
- CDbl
- CDec
- CInt
- CLng
- CLngPtr
- CSng
- CStr
- CVar



## Utilities
- IsArray
- IsDate
- IsEmpty
- IsError
- IsMissing
- IsNull
- IsNumeric
- IsObject



## Keywords
```
const
declare
dim
function
name
open
private
public
redim
static
sub
type

ByRef
ByVal

Date
```



## Condition (if)
```
if <condition> then
	<statements>
elseif <condition> then
	<statements>
else
	<statements>
end if

' Single-line
if <condition> then <statement>

if <a> OR <b> then ...
if <a> AND <b> then ...
```



## Is (type)



## Variant - Null
Used as a Varient subtype that indicates that a variable contains no valid data.



## For Next
```
for i = 1 to 10
	for j = 1 to 10
		<statements>
	next j
next i
```

```
for i = 10 to 1 step -1
next i
```



## For Each
```
for each <object> in <collection>
	<statements>
	exit for
next
```


## Do loop
```
do while|until <condition>
	exit do
loop 

do 
	exit do
loop while|until <condition>

```


## Array
- One-based
- Variant by default?
```

dim days, monday, tuesday
days = Array('Monday', 'Tuesday', ...)
monday = days(1)
tuesday = days(2)

```


## String Functions
- Len()
- StrComp()
- StrConv()
- Replace()
- Split()
- Left()
- Right()
- LTrim()
- RTrim()
- Trim()



## Operators
```
*
^
+
&: concat
=: assign
-
/
\
AddressOf
And: logical and
Or: logical or
Eqv: logical equal
Imp: implication?
Is: compare object references
Like: <string> like <pattern>
Mod
Not
```


## ByRef vs ByVal
Passing by reference is the default, unless explicitely declaring a parameter ByVal.


## Optional Arguments
```
Sub subName(p1 as String, Optional p2 as String)
End Sub
```

If not set, p2 will be `Nothing` (a null reference).
If p2 was a valuetype, such as int, it would be the default value, which is 0.


## Excel
ActiveSheet
ActiveSheet.Range("A1")
ActiveSheet.Range("A1:B1")