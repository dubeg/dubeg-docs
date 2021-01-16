# DatetimeOffset


```
<date> AT TIME ZONE <timezone> => datetimeoffset
```


```
DECLARE @StartDate datetimeoffset = dbo.ConvertUnixTimestampToDatetimeoffset(@FromTimestamp);
DECLARE @StartDate datetimeoffset = dbo.ConvertUnixTimestampToDatetimeoffset(@ToTimestamp);

...
WHERE 1=1
	AND (<date> AT TIME ZONE <timezone>) <= @StartDate
	AND (<date> AT TIME ZONE <timezone>) <= @EndDate
```