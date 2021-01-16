---
date: 2017-11-22
title: Dates
menu:
    sidebar:
        identifier: tsql-dates
        parent: SqlServer
---

Date/time datatypes in MS-SQL.

<table>
<thead>
<tr>
    <th>Datatype
    <th>Literal
    <th>Range
    <th>Notes
</tr>
</thead>
<tbody>
<tr>
    <td>datetime
    <td>
        'YYYYMMDD'
        <br>
        'YYYY-MM-DDThh:mm:ss[.mmm]'
    </td>
    <td>[1753-01-01, 9999-12-31]
    <td>Does not support UTC offsets.
</tr>
<tr>
    <td>datetime2
    <td>
        'YYYYMMDD'
        <br>
        'YYYYMMDD hh:mm'
        <br>
        'YYYY-MM-DDThh:mm:ss[.mmm]'
        <br>
        'YYYY-MM-DD hh:mm:ss[.mmm]'
    </td>
    <td>
        Date: [0001-01-01, 9999-12-31]
        <br>
        Time: [00:00:00, 23:59:59.9999999]
    </td>
    <td>
        T is a separator between date and time.
        <br>
        Timezone offset aware and preservation: no.
        <br>
        Daylight saving aware: no.
    </td>
</tr>
</tbody>
</table>

To store date/time/offset, you need another datatype: datetimeoffset. It is available in SQL Server 2008 and forward.

GetDate returns the current database timestamp without the database timezone offset. Therefore, it returns a date/time specific to its current timezone. To get a UTC date/time, you need GetUtcDate.

