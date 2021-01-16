# System tables
Virtual system tables (VST) can be queried through SQL or ABL.

[KnowledgeBase](https://documentation.progress.com/output/ua/OpenEdge_latest/index.html#page/dmadm%2Fvirtual-system-table-summaries.html).


## Database connection
TableName: pub."_connect"
Lists the connected users
It's the same list returned by `_mprshut.exe dbName -C LIST`.

- INT _Connect-Id: user number.
- INT _Connect-Usr: user number.
- VAR _Connect-Type: connection type: SELF, REMC, BROK, SERV, or BTCH.
- VAR _Connect-Name: username used for the connection.
- VAR _Connect-Device: device from which the user has connected.
- VAR _Connect-Time: Time the user connected to the database.
- INT _Connect-Pid: process id of the user session.
- INT _Connect-Server: Identifies the server if the connection is remote.
- VAR _Connect-IPAddress: ip addr if a remote client connection.
- _Connect-ClientType: client type for remote/local clients.
    + ABL: abl client.
    + SQLC: sql client.
    + WTA: Webspeed agent.
    + APSV: AppServer agent.
    + SQFC: SQL federated client.
- _Connect-Wait1:
- _Connect-Wait:
- _Connect-TransId:
- _Connect-SemNum:
- _Connect-semid:
- _Connect-Disconnect:
- _Connect-Resync:
- _Connect-Interrupt:
- _Connect-2phase:
- _Connect-Batch:
- _Connect-Misc:
- _Connect-CachingType:
- _Connect-CacheLastUpdate:
- _Connect-CacheInfoType:
- _Connect-CacheLineNumber:
- _Connect-CacheInfo:


### Query
```
SELECT * 
FROM OPENQUERY(APOGEE, '
    select 
        "_Connect-Id",
        "_Connect-Usr",
        "_Connect-Type",
        "_Connect-Name",
        "_Connect-Time",
        "_Connect-IPAddress"
    from pub."_connect"
    where
        "_connect-server" IS NOT NULL

    with(nolock)
')
```


## pub."_License"

- INT _Lic-ActiveConns: Number of active connections.
- INT _Lic-BatchConns: Number of current batch connections.
- INT _Lic-CurrConns: Number of current connections.
- INT _Lic-MaxActive: Maximum number of active connections.
- INT _Lic-MaxBatch: Maximum number of batch connections.
- INT _Lic-MaxCurrent: Maximum number of current connections.
- INT _Lic-MinActive: Minimum number of active users.
- INT _Lic-MinBatch: Minimum number of batch connections.
- INT _Lic-MinCurrent: Minimum number of current connections.
- INT _Lic-ValidUsers: Number of valid license users.