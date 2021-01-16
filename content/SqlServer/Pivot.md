---
date: 2018-08-17
title: Pivot
menu:
    sidebar:
        parent: SqlServer
---


__Pivoting a table__

Create one row out of a result set.
To summarize data.


## Example
Determine the number of purchase orders placed by certain employees.

SELECT
   VendorID,
   [250] AS EmployeeA,
   [251] AS EmployeeB
   ...
FROM 
(
   SELECT PurchaseOrderID, EmployeeID, VendorID
   FROM Purchasing.PurchaseOrderHeader
) Purchases
PIVOT
(
   COUNT(PurchaseOrderID)
   FOR EmployeeID IN ( <columns> )
)


### Notes
Brackets in the IN clause are to delimit abnormal identifiers.
Because values of the EmployeeID are used to become columns in a pivot table,
we must be "[]" to delimit the new column names, which can be abnormal.