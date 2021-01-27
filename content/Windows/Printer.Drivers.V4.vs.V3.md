# Printer Drivers


## v4
Starting with V4 drivers, the distribution model on the print server was changed. 

If the user connects to a V4 shared printer queue, the corresponding V4 driver is installed from the local driver store, or downloaded from Windows update. 

If no driver is available, the so called "Microsoft Enhanced Point and Print" driver is used. It provides a standard interface with only limited features.  

In this case, the server should firstly send the v4 driver which the vendor provides to client. 

---

Starting with Windows Server 2012 & Windows 8, Microsoft introduced a new driver model for printing: v4 drivers. The v3 model didn't change much since Windows Server 2000.





## v3
When using v3 driver model, the architecture specific driver should be downloaded to the client when it exists on the server or copied from Windows Update when the user connect to the printer. 