# Stored Procedures

## Procedures vs table functions
Within a TSQL query, the results of a procedure can only be worked further on 
by creating a temp table in which you execute the proc. 
The intermediate step of creating the temp table is annoying.

On the contrary, with a table function, you can avoid the step of creating a temp table
and immediatly use the results just as you'd do with a normal table.
However, table functions cannot include any complex logic, so we're kind of stuck
with shitty stored procs.


## Drop temporary tables at the end of a procedure
Temp tables (#TempTableName) aren't scoped to the procedure,
but they are scoped to the connection session. 
So, if within the same connection, you call multiple independent procedures and,
- in your first procedure, you create a temp table which you omit to drop,
- in your second procedure, you create another temp table with the same name,
.. you'll get an error: the table already exists.