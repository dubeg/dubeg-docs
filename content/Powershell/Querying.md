---
date: 2018-08-17
title: Querying
menu:
    sidebar:
        parent: Powershell
---

- where-object
- select-object
- foreach-object


## Select
Return the properties of an object.

```
Get-Process | select Name, Id
```

+ Cmdlet: select-object
+ Alias : select



## Where
Filter objects.

```
Get-Process | where { $_.Handles -gt 200 }
```

+ Cmdlet: where-object
+ Alias : where


```
-eq             Equal
-ne             Not equal
-ge             Greater than or equal
-gt             Greater than
-lt             Less than
-le             Less than or equal
-like           Use wildcards for pattern matching inclusion.
-notlike        Use wildcards for pattern matching exclusion.
-match          Regular expression comparison
-notmatch       Regular expression comparison
-replace        Replace operator
-contains       Containment operator
-notcontains    Containment operator
-shl            Shift bits left (PowerShell 3.0)
-shr            Shift bits right – preserves sign for signed values.(PowerShell 3.0)
-in             Like –contains, but with the operands reversed.(PowerShell 3.0)
-notin          Like –notcontains, but with the operands reversed.(PowerShell 3.0)
```



## Inspect an object
To discover the properties of an object:

```
Get-Process | gm
```

+ Cmdlet: get-member
+ Alias : gm

