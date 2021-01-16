---
date: 2018-08-17
title: Indexes
menu:
    sidebar:
        parent: SqlServer
---


## Clustered Index
The term cluster means a group of the same thing. As relating to databases, same/similar values are close to one another.

```
   Id
--|----
  | A
  | A
  | B
  | B
  | C
```

In the example above, the values A and B are clustered, ie. close to one another.



In SQL Server, the term refers to the way records are organized in the data structure of a table (ie. a B-tree). That's why there can only be one clustered indexes. Non-Clustered indexes are built on top of the clustered index.


> Indeed, the documentation and the name itself are quite misleading. Having a "clustered index" really has quite little to do with the index. Conceptually, what you really have is "a table clustered on index x".


### Additional details
Both clustered and nonclustered indexes are organized as B trees. 

![](../images/btree.gif)

The key difference between clustered indexes and non clustered indexes is that the leaf level of the clustered index is the table. This has two implications.

+ The rows on the clustered index leaf pages always contains something for each of the (non sparse) columns in the table (either the value, or a pointer to the actual value).
+ The clustered index is the primary copy of a table.

Non-clustered indexes can also support the first point by using the INCLUDE clause to explicitly include all non-key columns, but they still remain secondary representations: there is always a master copy of the data around, which is the table itself.

> There can be only one clustered index per table, because the leaf level rows of the clustered index are the table rows.



## Nonclustered index
A nonclustered index is an index structure separate from the data stored in a table that reorders one or more selected columns.

It helps searching data more quicly than searching the underlying table.
Queries can sometimes be answered entirely by the data in such an index, or the index can point to the rows in the underlying table.

Generally, such indexes are created to improve the performance of frequently used queries not covered by the clustered index.


## References
https://stackoverflow.com/questions/1251636/what-do-clustered-and-non-clustered-index-actually-mean