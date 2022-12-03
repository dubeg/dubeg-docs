# Restore databases

```tsql
USE [MASTER];

----------------------
-- Get logical names & co.
----------------------
RESTORE FILELISTONLY FROM DISK = N'/backups/DbName.bak' WITH FILE = 1;

----------------------
-- Get default locations
----------------------
SELECT 
    ServerProperty(N'InstanceDefaultDataPath') AS default_file,
    ServerProperty(N'InstanceDefaultLogPath') AS default_log
    ;

----------------------
-- Restore databases
----------------------
-- RESTORE DATABASE [DbName]
-- FROM DISK = N'/backups/DbName.bak'
-- WITH
-- MOVE 'DbName_data' TO '/var/opt/mssql/data/DbName_data.mdf',
-- MOVE 'DbName_log' TO '/var/opt/mssql/data/DbName_log.ldf',
-- REPLACE, RECOVERY, STATS=10;

```
