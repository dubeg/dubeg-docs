# Cisco: Re-enable port after it became err-disabled
Caused by BPDU guard (portFast check).

On the web portal, in console UI:

Mode: Exec
```
show interfaces status
show interfaces status err-disabled
```



Mode: Configure
Enter all lines, then press "Run Command"
```
interface g1/0/17
shut
no shut
```

This will re-enable the port.