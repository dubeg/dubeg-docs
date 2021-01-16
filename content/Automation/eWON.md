---
date: 2020-07-22
title: eWON
menu:
    sidebar:
        parent: Automation
---

## Flexy
Using the Flexy, it's possible to do some BASIC scripting to respond to events and whatnot.



## BASIC Scripting
- Access tag values (read/write)
- Access eWON configuration (read/write)
- Send notifications (sms, emails)
- Read SMS
- Read/write files
- Etc.

Variables
- Global scope by default
- varName% => Integer
- varName$ => String
- $varName => locally scoped (in function)
- TagName@ => direct access to tag

Events
- ONTIMER: when timer ticks
- ONCHANGE: when tag changes
- ONALARM: when alarmTag state changes
- ONERROR: when error occurs
- ONSTATUS: when scheduled action is completed
- ONPPP: ppp goes online or offline
- ONVPN: vpn goes connected or disconnected
- ONWAN: wan goes connected or disconnected


INIT: declare events/callbacks.
```
ONSTATUS "GOTO fnCallback1"
ONTIMER 1, "GOTO fnCallback2"
TSET 1,1
ONCHANGE "PLC_DI0", "..."
ONALARM "PLC_DI0", "GOTO fnCallback3"
END
```




## M2Web API
Using BASIC Scripting and the function RequestHTTPX, it's possible to query the M2Web API.

- To exchange tag values between two devices.
- Doesn't require a public IP to establish Talk2M connections.
- Requires a Talk2M developer ID.
- Devices need to be registered in a Talk2M account.
- Devices need to be online.
- eWON Flexy firmware >= 11 (supports RequestHttpX)
- Limited calls: up to 30,000 per day, per account.

To read the tags of a remote eWON, it's needed to use an export block descriptor, eg. `$dtIV$ftT$flAB`.

- `$dtIV`: Datatype = Instant Values
- `$ftT`: Filetype = [T]ext or [B]inary
- `$flAB`: Filter = AB (AllenBradley)


```
https://m2web.talk2m.com/t2mapi/get/<eWonRegisteredName>/rcgi.bin/
UpdateTagForm?
    TagName1=
    &TagValue1=

ParamForm?
    AST_Param=$dtIV$ftT
```


Result of a ParamForm query (in a file).
```
"TagId";"TagName";"Value";"AlStatus";"AlType";"Quality"
1;"tank";0;0;0;65472
2;"Flow";0;0;0;65472
3;"FtpTrigger";0;0;0;65472
```



## Notes
- When the IO Server is offline, it's not possible to change the values of its tags.
- ONCHANGE: not triggered for tags when their IOServer changes state (offline <-> online).
- REQUESTHTTPX: need to encode special chars such as whitespace, ie. `%20`, when building the url string, otherwise the request may not work.




## Example
```
Init:
TSET 1, 5
ONTIMER 1, "GOTO UpdateRemote"


UpdateRemote:
// -------------------
// Credentials
// -------------------
account$ = ""
username$ = ""
password$ = ""
developerid$ = ""
deviceName$ = ""
deviceUsername$ = ""
devicePassword$ = ""

url$ = "https://m2web.talk2m.com/t2mapi/get/" + deviceName$
url$ = url$ + "/rcgi.bin/UpdateTagForm"
url$ = url$ + "?TagName1=tagA"
url$ = url$ + "&TagValue1=" + Str$ tagA@
url$ = url$ + "&TagName2=tagB"
url$ = url$ + "&TagValue2=" + Str$ tagB@
url$ = url$ + "&t2maccount=" + account$
url$ = url$ + "&t2musername=" + username$ 
url$ = url$ + "&t2mpassword=" + password$
url$ = url$ + "&t2mdeveloperid=" + developerid$ 
url$ = url$ + "&t2mdeviceusername=" + deviceUsername$ 
url$ = url$ + "&t2mdevicepassword=" + devicePassword$
// --
REQUESTHTTPX url$, "GET"
requestId% = GETSYS PRG,"ACTIONID"
ONSTATUS "Goto RequestCompleted"



RequestCompleted:
eventId% = GETSYS PRG,"EVTINFO"
If (eventId% = requestId%) Then
    SETSYS PRG,"ACTIONID",eventId%
    statusAction% = GETSYS PRG,"ACTIONSTAT"
    If (statusAction% <> 0) Then
        Goto OnError
    Else
        statusHttp$ = RESPONSEHTTPX "STATUSCODE"
        If (statusHttp$ <> 200) Then
            Goto OnError
        EndIf
    EndIf
EndIf


OnError:
pumpTag@ = 0
```