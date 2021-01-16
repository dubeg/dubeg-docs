---
date: 2018-08-17
title: Execution Plan
menu:
    sidebar:
        parent: SqlServer
---


An execution plan documents..

- the estimated cost of a query,
- the indexes used, 
- and the operations performed.


## Query Optimizer
The query optimizer of SQL Server analyzes a query and the statistics available about the underlying tables, indexes and indexes views.

The optimizer uses the stats to create several plans. Each plan may use different indexes, seeks vs scans, different types of JOINs, and operations in different sequences in an attempt to find the optimal plan.

Next, the optimizer assigns a relative cost for both IO and procesing for each operation. It then sums the cost of each operation to produce a total cost for each plan. After producing several different execution plans, it the selects the plan with the lowest total cost and then uses that plan to execute the query. 

Once an execution plan is selected by the optimizer, it is stored in cache. The next time the query is executed, the optimizer will look in cache first, and if it finds one, it uses it and avoid the time-sink of creating new estimated plans.


## Estimated vs Actual
The estimated plan is calculated by the query optimizer prior to execution. It merely represents what the optimizer believes will be the lowest cost plan. The actual plan, however, is the actual steps that were executed to process the query. At times, some of the estimated and actual values may be different.

The reason the estimated and actual plans may differ are..

- an estimated plan cannot be created:
  This can occur when a create statement is located in the same batch that uses the created object.
- stale statistics:
- parallelism 