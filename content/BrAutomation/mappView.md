---
date: 2021-03-11
title: mappView
menu:
    sidebar:
        parent: BrAutomation
---


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