# Windows Terminal Services API

- WtsApi32.dll (Terminal Services API)
	+ Uses WinSta.dll (Windows Station Api)
- Structures
	+ WinStationQueryInformation
	+ WtsQuerySessionInformation
	+ WFQuerySessionInformation
- What is WinFrame?
	+ Terminal Services API made by Citrix (direct descendent).



## Citrix
MetaFrame/WinFrame are both Citrix products.
WinFrame existed prior to Windows Terminal Services,
and were used, as part of an arrangement between Citrix and Microsoft,
to develop the WTS Api.

- MetaFrame sits on top of WTS.
- WinFrame is probably discontinued (stuck to NT 3.51).