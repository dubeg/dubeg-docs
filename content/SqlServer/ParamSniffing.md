---
date: 2019-10-15
title: Parameter Sniffing
menu:
    sidebar:
        parent: SqlServer
---

For a given stored procedure, SQL Server builds an execution plan 
based on the set of parameters given on its first execution.

This means that a stored procedure is only optimized for the first set of parameters it's been given. If it happens to run with a different set of parameters for which the execution plan's estimates are grossly wrong, you will experience performance degradation, as compared to the query's runtime when ran out of the storedProc (aka. as a standalone query).

Parameter Sniffing can be insidious. Let's say your storedProc runs well (or it seems) with different sets of parameters; as luck would have it, the execution plan was created from large estimates, and worked OK for different situations. But then, something happens to SQL Server that causes it to flush all existing execution plans. A new execution plan with much smaller estimates is created this time, and when the storedProc runs again with different parameters that the existing plan is totally unfit for, SQL Server chugs through it, and you wonder what the hell is going on.


## Progression of a perf tuner
+ Let's restart windows!
+ Let's restart SQL Server!
+ Let's run DBCC FREEPROCCACHE!
+ Let's rebuild indexes!
+ Let's rebuild indexes on this table!
+ Let's update statistics on this table!
+ Let's clear this one plan from cache! 



Blow the execution cache
```
DBCC FREEPROCCACHE;
```


## Solutions

### OPTION (RECOMPILE)
+ Rebuild an execution plan at every execution.
+ At the stored procedure level.
    - Don't do this, for diag/stats purposes.
+ At the sql statement level (select, etc).
    + Prefer this.
+ Makes sense for rarely-run (max once/twice per minute)


### OPTIMIZE FOR UNKNOWN
+ At the statement level.
+ Works as if you're using a declared variable.
    - Forces usage of density vector (just like local variable).
    - Density vector may be entirely off, watch out.
+ Works well for widely spread-out data.
+ Gives a plan that's predictable, but may be incredibly poor.

Worked the same way as using a local variable that's the same value as the parameter. (In fact, I remember using this trick once lel.).
Don't do this.


### OPTIMIZE FOR value
+ Optimize for a choosen value.
+ Hard-coded value may be technical debt over time, if the data is prone to change.



## References
- https://channel9.msdn.com/Events/SQLDay/SQLDay-2017/Identifying-and-Fixing-Parameter-Sniffing