/* ----------------------------------------------- */
/* Files: */
/* example.p : procedure */
/*  */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/* Example 1 - Basic */
/* ----------------------------------------------- */
/* ABL Syntax - Comments */
/* Statements ends with : or . */
DEFINE VARIABLE tax AS DECIMAL.
DEFINE VARIABLE amount AS DECIMAL.

PROCEDURE CalculateTotal:
DEFINE OUTPUT PARAMETER total AS DECIMAL INITIAL 0.

FOR EACH customer FIELD:
END.

END. /* EndOfProc */


/* ----------------------------------------------- */
/* Example 2 */
/* ----------------------------------------------- */
/* The ABL compiler ensures datatypes match the schema.*/
DEFINE VARIABLE repname LIKE Customer.SalesRep INITIAL "GPE".
DEFINE VARIABLE creditFactor LIKE Customer.Balance INITIAL 1.05.

FOR EACH Customer WHERE SalesRep = repname AND Balance > CreditLimit:
   Balance = Balance * creditFactor.
END.



/* ----------------------------------------------- */
/* Example 2 */
/* ----------------------------------------------- */
DEF VAR shipDate AS DATE INITIAL 09/19/1999.
FOR EACH salesrep,
    EACH customer OF salesrep,
    // An alternate version of this statement is:
    // EACH customer WHERE cust.salesrep = salesrep.salesrep,
        EACH order OF customer WHERE Order.OrderStatus = "Ordered" OR
        (Order.OrderStatus = "Shipped" AND INTERVAL(order.shipdate, shipDate, "months") <= 1),
            EACH orderline OF order WHERE orderline.itemnum = 14:
                // You can access any field from the joined record.
                DISPLAY 
                    SalesRep.Repname FORMAT "x(10)"
                    Customer.NAME
                    order.ordernum 
                    orderline.price.
END.



/* ----------------------------------------------- */
/* Example 3 */
/* ----------------------------------------------- */
DEFINE VARIABLE id AS INTEGER INITIAL 0.
DEFINE VARIABLE ref-cust-num AS INTEGER INITIAL 0.

DEFINE BUFFER ref-cust FOR Customer.
DEFINE BUFFER ord1 FOR order.
DEFINE BUFFER ord2 FOR order.

/* Can be replaced with name or any other field. */
id = 3010.
ref-cust-num = 1010. 

DO  TRANSACTION:
    FIND FIRST customer WHERE customer.custnum = id NO-ERROR.
    
    IF NOT available(customer) THEN DO:
        CREATE customer.
        customer.custnum = id.
        /* Fill in customer fields. */
    END.

    /* Fill in order fields. */
    CREATE order.
    order.custnum = customer.custnum.
    
    /* Fill in orderline fields. */
    CREATE orderline.
    orderline.ordernum = order.ordernum.
    
    /* Give a $50 credit to the referring customer. */
    IF ref-cust-num > 0 THEN DO:
        FIND FIRST ref-cust WHERE ref-cust.custnum = ref-cust-num NO-ERROR.                                            
    
        IF available(ref-cust) THEN DO:
            ref-cust.balance = ref-cust.balance - 50.
        END.
    END.

    /* Loop through all the records */
    FOR EACH ord1 WHERE ord1.custnum = customer.custnum:
        
        /* Find orders that happen in the same month 
           and assign them the same ship date. */
        FIND FIRST ord2 WHERE 
            MONTH(ord1.shipdate) = MONTH(ord2.shipdate) AND 
            YEAR(ord1.shipdate) = YEAR(ord2.shipdate) NO-ERROR.
        
        IF available(ord2) THEN DO: 
            IF ord2.shipdate < ord1.shipdate THEN DO:
                ord2.shipdate = ord1.shipdate.
            END.
            ELSE DO: 
                ord1.shipdate = ord2.shipdate.  
            END.
        END.

    END.
END.




/* ----------------------------------------------- */
/* Example 4 - With file input */
/* input.txt
1 "Brawn , Bubba B."
8 "Pitt , Dirk K."
10 "Donna Swindall"
11 "Gilles Ehrer"
38 "Harry Munvig"
42 "Jan Loopsnel"
1193 "Kari Iso-Kauppinen"
1300 "Smith , Spike Louise"
2087 "Robert Roller"
2106 "Kari Iso-Kauppinen"
 */
/* ----------------------------------------------- */
DEFINE temp-table primeCustomer
   FIELD id LIKE customer.CustNum
   FIELD newRep LIKE salesrep.repname.

DEFINE VARIABLE i1 as INTEGER.
DEFINE VARIABLE c1 as CHARACTER.

// Read in information from a file
INPUT FROM "input.txt".

REPEAT :
    IMPORT  i1 c1.
    CREATE primeCustomer.
    
    primeCustomer.id = i1.
    primeCustomer.newRep = c1.

END.

/* Case 1: Get a list of all the Customers we are going to impact. */
FOR EACH primeCustomer, FIRST Customer WHERE Customer.CustNum = primeCustomer.id BY primeCustomer.id:
   DISPLAY Customer.Name primeCustomer.id.
END.

/* Case 2: Get a list of all the new SalesReps for Massachusetts customers */
FOR EACH Customer WHERE Customer.State = "MA", EACH primeCustomer WHERE primeCustomer.id = Customer.CustNum:
   DISPLAY Customer.Name primeCustomer.newRep.
END.

/* Case 3: Go through each customer and assign them the sales rep
   with the given name. */
FOR EACH primeCustomer:
   FIND Customer WHERE Customer.CustNum = primeCustomer.id.
   FIND SalesRep WHERE SalesRep.RepName = primeCustomer.newRep.
   Customer.SalesRep = SalesRep.SalesRep.
END.






/* ----------------------------------------------- */
/* Example 5*/
/* ----------------------------------------------- */
DEFINE TEMP-TABLE ttitem NO-UNDO LIKE ITEM.
DEFINE TEMP-TABLE ttorderline NO-UNDO LIKE ORDERLINE.

/* Create a working set of the ITEM temp-table that fulfill
   certain conditions. */
FOR EACH ITEM:
    IF ITEM.weight >= 2.0 THEN DO:
        CREATE ttitem.
        BUFFER-COPY ITEM TO ttitem.
        RELEASE ttitem.
    END.
END.

FOR EACH orderline:
    CREATE ttorderline.
    BUFFER-COPY ORDERLINE TO ttorderline.
    RELEASE ttorderline.
END.

/* Navigate through the records */
FIND FIRST ttitem WHERE ttitem.minqty >= 5.
DISPLAY ttitem. 

FIND LAST ttorderline WHERE ttorderline.itemnum = 14.
DISPLAY ttoderline.

FIND PREV ttorderline WHERE ttorderline.itemnum = 14.
DISPLAY ttoderline.

/* Sort from highest weight to lowest and filter out 
   items where we have stock less than 5000 */
FOR EACH ttitem WHERE ttitem.onhand > 5000 
    BY ttitem.weight DESCENDING:
    DISPLAY ttitem. 
END.

/* Find a subset of items that have been ordered more than 50 times
   in a single order. */
FOR EACH ttorderline WHERE ttorderline.qty >= 50,
    EACH ttitem WHERE ttorderline.itemnum = ttitem.itemnum:
    DISPLAY ttitem.itemname ttitem.itemnum ttorderline.qty.
END.

/* Find the number of orders for each item and the total amount it ever
   sold. Then, display these alphabetically by ttitem.name. */ 
FOR EACH ttitem BY ttitem.itemname:
    FOR EACH ttorderline WHERE ttorderline.itemnum = ttitem.itemnum:
        ACCUMULATE ttorderline.ordernum (COUNT).
        ACCUMULATE ttorderline.qty (TOTAL).
    END.
    DISPLAY ttitem.itemname (ACCUM COUNT ttorderline.ordernum) 
        (ACCUM TOTAL ttorderline.qty).
END.