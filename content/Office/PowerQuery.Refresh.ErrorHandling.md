https://old.reddit.com/r/excel/comments/bmixlj/vba_to_show_message_if_query_refresh_fails/emwz2nb/

```
Sub RefreshPQConnections()
    For Each cn In Application.ActiveWorkbook.Connections
     isPowerQueryConnection = InStr(1, cn.OLEDBConnection.Connection, "Provider=Microsoft.Mashup.OleDb.1") > 0
     If isPowerQueryConnection Then
        cn.OLEDBConnection.BackgroundQuery = False
        cn.Refresh
     End If
    Next cn
End Sub
```


```
Sub RefreshEverything()
    Dim MsgAnswer
    MsgAnswer = MsgBox("Click Yes to refresh the data or No to cancel.", vbYesNo)
    If MsgAnswer = vbYes Then
    On Error GoTo errorhandling
    RefreshPQConnections
    ActiveWorkbook.RefreshAll
    MsgBox "Data refreshed. Click OK to continue."
    Else
    Exit Sub
    End If
    Exit Sub
errorhandling:
    MsgBox "Unable to refresh. Please contact the OCM BPO for further support."
End Sub
```