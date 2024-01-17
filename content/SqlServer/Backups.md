---
date: 2020-04-30
title: Backups
menu:
    sidebar:
        identifier: sql-backups
        parent: SqlServer
---

_Using SQL Server 2017_



Create backup
-------------
```
BACKUP DATABASE <dbName>
TO DISK = '<path>'
```



Recent backups
--------------
```
SELECT TOP 10
	name,
	user_name,
	backup_start_Date,
	database_name,
	machine_name,
	backup_size,
	compressed_backup_size
FROM msdb..backupset b
ORDER BY
	backup_finish_date desc
```



Recent Backups in custom locations
----------------------------------
```
SELECT TOP 10
	DatabaseName = x.database_name,
    LastBackupFileName = x.physical_device_name,
    LastBackupDatetime = x.backup_start_date
FROM (
	SELECT
		bs.database_name,
        bs.backup_start_date,
        bmf.physical_device_name,
		Ordinal = ROW_NUMBER() OVER( PARTITION BY bs.database_name ORDER BY bs.backup_start_date DESC )
    FROM msdb.dbo.backupmediafamily bmf
	JOIN msdb.dbo.backupmediaset bms ON bmf.media_set_id = bms.media_set_id
	JOIN msdb.dbo.backupset bs ON bms.media_set_id = bs.media_set_id
	WHERE 1=1
		AND bs.[type] = 'D'
		AND bs.is_copy_only = 0 
) x
WHERE 
	x.Ordinal <= 10
ORDER BY
	DatabaseName;
```
