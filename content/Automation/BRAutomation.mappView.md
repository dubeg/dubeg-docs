---
date: 2021-03-11
title: B&R Automation
menu:
    sidebar:
        parent: Automation
---

Notes on mappView

## Variable
- Logical > Variables.var > Define variable name & type.
- Configuration > Connectivity > OpcUA > OpcUaMap.uad
    + Default View -> `<Default>` -> Global Variables -> Select tag & enable it.
    + Don't forget to define permissions.
        - Default permissions only allow the Anonymous user to read tags.
        - ie. opcUa.NodeAction.SetValue won't work.
- Initialize variables in a program (eg. Main.st).
- In a MappView page, bind them to a control. 


## Datatype
- Literals
    - ANY_INT: -1, 1
    - REAL: 1.0
    - BOOL: TRUE | FALSE
    - WSTRING: "str with a newline $n"
        + Special characters
            - $l: line feed
            - $n: line feed
            - $r: carriage return
            - $p: page break
            - $t: tab
            - $$: dollar sign
            - $": quote
            - $hhhh: hex value (eg. $000A)



## Opc Ua
- Addressing
    + Global variables: `::AsGlobalPV:Variable``
    + Local variables (process, IEC, ie. defined for a program): `::Program:Variable`
    + Application module variables: `AppModule::Program::Variable`

- Actions
    + opcUa.NodeAction.GetServerStatus
    + opcUa.NodeAction.SetValueBool
    + opcUa.NodeAction.SetValueNumber
    + opcUa.NodeAction.SetValueDateTime
    + opcUa.NodeAction.SetValueString
    + opcUa.NodeAction.AddValue
    + opcUa.NodeAction.GetValue
    + opcUa.NodeAction.ToggleValueBool


## Event Binding
- Operand: container for a value, for use in event.
    + Definition: `operandName`
    + Usage: 
        + Expression: `operandName AND ...`
        + Argument: `=operandName`
            * Otherwise it's treated like a literal string.

```
<Target xsi:type="opcUa.NodeAction" refId="::Program:VarX" >
    <Method xsi:type="opcUa.NodeAction.SetValueBool" value="true" />
</Target>
```



```
<EventBinding id="content_0.BtnOpen.Click">
    <Source xsi:type="widgets.brease.Button.Event" contentRefId="content_0" widgetRefId="BtnOpen" event="Click" />
    <Operand name="path" datatype="ANY_STRING">
        <ReadTarget xsi:type="opcUa.NodeAction.Read" refId="::AsGlobalPV:TextPadFilePath" serverAlias="">
            <Method xsi:type="opcUa.NodeAction.GetValue" />
        </ReadTarget>
    </Operand>
    <EventHandler>
        <Action>
            <Target xsi:type="widgets.brease.TextPad.Action" contentRefId="content_0" widgetRefId="tpCncFile">
                <Method xsi:type="widgets.brease.TextPad.Action.Open" filePath="=path" />
            </Target>
        </Action>
    </EventHandler>
</EventBinding>
```


```
<EventBinding id="textPadFilePath_ValueChanged">
    <Source xsi:type="opcUa.Event" refId="::AsGlobalPV:TextPadFilePath" event="ValueChanged" />
    <Operand datatype="ANY_STRING" name="path">
        <ReadTarget xsi:type="opcUa.NodeAction.Read" refId="::AsGlobalPV:TextPadFilePath" serverAlias="">
            <Method xsi:type="opcUa.NodeAction.GetValue" />
        </ReadTarget>
    </Operand>
    <EventHandler>
        <Action>
            <Target xsi:type="widgets.brease.TextPad.Action" contentRefId="content_0" widgetRefId="tpCncFile">
                <Method xsi:type="widgets.brease.TextPad.Action.Open" filePath="=path" />
            </Target>
        </Action>
    </EventHandler>
</EventBinding>
```


## TextPad / MotionPad
- To open a file in TextPad, the file must be from a File Device defined on the target computer.
- It must also be added to a MpFileManager configuration under mappServices.


## Expressions


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