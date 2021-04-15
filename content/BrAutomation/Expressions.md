---
date: 2021-03-11
title: Expressions
menu:
    sidebar:
        parent: BrAutomation
---

Requirements

- ExpressionType
    + File: .expressionType
    + Datatype
        - BOOL 
        - ANY_REAL 
        - ANY_INT 
        - ANY_STRING 
        - BOOL_ARRAY 
        - ANY_REAL_ARRAY 
        - ANY_INT_ARRAY 
        - ANY_STRING_ARRAY 
    + Operations
        - NUM
            + A + B
            + A * B
            + A - B
            + A / B
            + A MOD B
        - BOOL
            - A AND B
            - A OR B
            - A XOR B
            - NOT A
        - Comparison
            - A < B (symbol must be replaced with XML entity)
            - A ≤ B
            - A = B
            - A <> B
        - Priority
            + (A - B) / C
        - Index
            + array[1]
        - Examples
            - Bool: A
                + A AND TRUE
                + A
                + A = TRUE
            - String: A
                + A = "str"
                + "a" < "b"
- Expression 
    * Instance of an expression, available in HMI.
    + File: .expression
    + Result of an expression is available as an attribute named result, for value binding.
- Add expressionSets to .vis



Expression Type
```
...
<ExpressionType name="expType" datatype="BOOL">
    <Operands>
        <Operand name="A" datatype="BOOL" />
    </Operands>
    <Operation>
        NOT A
    </Operation>
</ExpressionType>
...
```



Expression Instance
```
<ExpressionsSet id="expressionSet1" ...>
    <Expressions>
        <Expression id="expButtonEnabled" xsi:type="content" contentRefId="Content1" type="expType" />
    </Expressions>
</ExpressionsSet>
```


Binding
```
<Binding mode="oneWay">
    <Source xsi:type="opcUa" refId="::Prg:ButtonEnabled" attribute="value" />
    <Target xsi:type="expression" refId="expButtonEnabled" attribute="A" />
</Binding>

<Binding mode="oneWay">
    <Source xsi:type="expression" refId="expButtonEnabled" attribute="result" />
    <Target xsi:type="brease" widgetRefId="btnStart" contentRefId="Content1" attribute="enable" />
</Binding>
```