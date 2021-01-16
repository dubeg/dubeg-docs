# 4GL Queries

FIND: get single
FOR EACH: loop over many.
OPEN QUERY/GET: aims to replace FIND in most cases.

FIND
FIND FIRST
FIND NEXT
FIND LAST
FIND PREV
FIND CURRENT
FIND record WHERE ...

CAN-FIND( [ First | Last ] )
CAN-FIND( record WHERE ... )

GET
GET FIRST
GET NEXT
GET LAST
GET PREV
GET CURRENT

DEFINE QUERY
OPEN QUERY

BY: specifies ordering.
NO-WAIT: prevents query form waiting if record is locked.
FIELDS: defines which fields to retrieve.

BREAK BY enables the use of several keywords inside the resulting iteration:
- FIRST-OF/LAST-OF
- FIRST/LAST
It specifies grouping column(s) for the query/iteration,
and sorts resulting rows according to these columns.
It is more similar to ORDER BY than GROUP BY.
It doesnt perform aggregation, it merely returns all rows in sorted order.
What makes it different from ORDER BY is that it enables the use of FIRST-OF and LAST-OF to determine if the current record is the first or last record of the "group".


## Notes
```
FOR
    EACH item-whs-bin,
    FIRST item-whs-ser,
    FIRST item,


=>

FROM item-whs-bin
JOIN item-whs-ser
JOIN item
```