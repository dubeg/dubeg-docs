# Progress

## History
Data Language Corporation, 1981
Progress Software, 1987
Progress, 2016

Acquired: eXcelon Corporation, 2002
Acquired: DataDirect Technologies Ltd, 2003
Acquired: Apama, 2005
Acquired: ACtional Corporation, 2006
Acquired: Neon Systems, 2006
Acquired: Savvion Inc, 2010
Acquired: Telerik, 2014


## Products
DataDirect Connect database drivers
OpenEdge BPM

OpenEdge ABL
    - Formerly Progress 4GL
    - Business application language.
    - Includes its own relational database.
    - Includes its own programming tool (IDE?)
    - History
        + Progress 4GL v1..9
        + OpenEdge 10 (2004)
        + OpenEdge 10.1 (2006)
        + OpenEdge 10.1B (2007)
        + OpenEdge 10.1C (2008)
        + OpenEdge 10.2A (2008)
        + OpenEdge 10.2B (2009)
        + OpenEdge 11.0 (2011)
        + OpenEdge 11.1 (2012)
        + OpenEdge 11.2 (2013)
        + OpenEdge 11.3 (2013)
        + OpenEdge 11.4 (2014)
        + OpenEdge 11.5 (2014)
        + OpenEdge 11.6 (2015)
        + OpenEdge 11.7 (2017)

## ABL
Originally created as a DSL to make business data management 
and reporting simple.

Cons
- No inherent concept of inter-table relationships (F.K.)
- All types of division are implicitely done as DECIMAL.
  Even when dividing two integers. Ex: 1 / 2 = 0.5, and
  if you store the result in an integer, it's rounded up to 1.
- Arrays are 1-based rather than 0-based.
- Anything can be assigned a value of ?.

## Syntaxes

_Select_
```
-----------------------
-- SQL
-----------------------
SELECT * FROM customer;


-----------------------
-- ABL
-----------------------
FOR EACH customer NO-LOCK:
    DISPLAY customer.
END.

/* If tables use identical prefixes and share at least one unique index, you
   can do the following: */
FOR EACH order-line OF order:
END.

```

_Update_
```
-----------------------
-- SQL
-----------------------
UDPATE customer
SET salesman = 'Fred'
WHERE custno = 14

-----------------------
-- ABL
-----------------------
FOR EACH customer WHERE customer.custno = 4 EXCLUSIVE-LOCK:
    ASSIGN customer.salesman = 'Fred'.
END.

```