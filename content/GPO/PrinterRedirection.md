---
date: 2020-05-02
title: Printer Redirection
menu:
    sidebar:
        parent: GPO
---

Disabling automatic printer mapping when connecting to an host with Remote Desktop Services.


## Via GPO
Open `gpedit`:

1. Computer Configuration 
1. Administrative Templates 
1. Windows Components 
1. Remote Desktop Services 
1. Remote Desktop Session Host 
1. Printer Redirection 
    + Do not allow client printer redirection



## Via mstsc settings
...