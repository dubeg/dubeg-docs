# VMWare Virtualization

- ESXi (aka. vSphere Hypervisor)
    + Runs on a physical server, hosts 1..N virtual machines.
    + Licensed through 1..N "vSphere License", one per CPU.
    + Similar to Hyper-V server.

- ESXi Embedded Host Client (aka. VMWare Host Client)
    + Web interface hosted on ESXi server.
    + Management of the ESXi server.

- vCenter
    + Management of multiple ESXi servers, as well as other VMWare softwares.
    + Provides centralized management of many servers, vs one server.

- vSphere Web Client
    + Web-based client
    + Probably runs on/hosted by vCenter host.

- vSphere Client (Desktop)
    + Installed on laptops of administrators, etc.
    + Connects to a vCenter server, or ESXi host.


Used to be that only vSphere Client (Desktop) existed, now you don't have to install it to manage ESXi hosts.

+ Using a browser, connect to "ESXi Embedded Host Client" to manage an ESXi host.
+ Using a browser, connect to "vSphere Web Client" to connect to vCenter(s), or ESXi hosts.