# Chiplets
Discretely manufactured modules, then interconnected using a packaging technology during assembly in say, a CPU or whatever. 

>The art of connecting chiplets is all in the packaging.

Intel's technologies:
- Embedded Die Interconnect Bridge 'EMIB'
	+ Uses small embedded silicon connection within a substrate (?)
	+ Used in Intel's FPGAs, connecting them to the memory|transceivers|third-party IP.
	+ Used in Kaby Lake G, connecting the Radeon GPU to on-package high-bandwidth memory.

- Foveros
	+ Akin to an interposer-like tech, it's a silicon stacking tech that allows different chips to be connected by TSVs (Through Silicon Vias).
		* Via: vertical chip-to-chip connection.
	+ Allows separate manufacturing of IO, cores and onboard LLC/DRAM modules. 
	* A big challenge of multi-die strategy is the thermal constraints of the dies used.