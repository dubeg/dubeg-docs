# RemoteFX
- Set of technologies that enhance visual experience of Remote Desktop Protocol (RDP).
- Introduced in WinServer 2008 R2 SP1.
	+ Based on Calista Technologieis.


## Abilities

### Server 2008 R2 SP1
- vGPU
	+ Present virtualized instance of physical GPU, enabling hardware acceleration of graphics.

- USB Redirection

- Codec
	+ Lossy codec preserving high-fidelity experience for video and text. Uses CPU for encoding.


### Server 2012
- Adaptive Graphics
	+ Dynamically adapts to various runtime conditions, such as graphic content types, CPU, network bandwidth, and client-side rendering speed.

- WAN
	+ Series of changes to the network transport pipeline to support UDP and ensure a fluid experience in both WAN and Wireless network configs.

- Multi-Touch
	+ Supports remoting of gestures.

- Media Redirection API
	+ Allows VoIP apps to integrate with RemoteFX (enabling rendering of audio/video content of those apps on the client-side).

- Choice of GPU
	+ All RemoteFX features can be used with either a software-emulated GPU, which is available by default in all virtual machines and session hosts, or they can benefit from hardware-acceleration when a physical GPU (available through vGPU) is present.

- vGPU now supports Dx11 .

- Codec supports progressive rendering.


### Server 2016
- Supports OpenGL 4.4, OpenCL 1.1
- More dedicated VRAM for RemoteFX adapter.
- Various performance improvements.
- Media Streaming (H.264) replaced Media Redirection.



## Requirements
- Server 2008
	+ Session Hosts: codec.
	+ VDI: codec, vGPU, USB.
- From Win1511, RemoteFX is brought into client Hyper-V.
- From Win2016, Generation 2 VMs supports RemoteFX.
- From Win2012, all features except vGPU can be used without physical GPU (synthetic software-emulated GPU is used).


### vGPU
- Hyper-V Server must be the host.
- VMs must be hosted in Hyper-V.
- Server's CPU must support & enable Second Level Address Translation (SLAT).
- From Win2012, a Dx11-capable GPU (with WDDM 1.2 driver) must be present.
- Host must not be a domain controller.
- GPU requirements
	+ Nvidia Quadro[FX|Plex] xxx
	+ AMD FirePRo xxx
- Guest OS must support RemoteFX virtual graphics adapter (only Enterprise editions of Windows, starting from Win7).
	+ If no support, then falls back to using default emulated graphics adapter.



## Enabling RemoteFX
On a RD Session Host:

- No need to install RemoteFX role (only required in VDI scenario).
- No GPU required (only required in VDI scenario).

Is it enabled by default on Windows Server 2016?




## Using AVC 444

Computer Configuration 
-> Administrative Templates 
-> Windows Components 
-> Remote Desktop Services 
-> Remote Desktop Session Host 
-> Remote Session Environment

1. Prioritize H.264/AVC 444 Graphics mode for Remote Desktop connections 

When enabled on the RDP Server, the H.264/AVC 444 mode will be prioritized when the RDP 10 client and server both support AVC/H.264 and support the AVC 444 mode. 

Note: For Remote Desktop Session Host (RDSH) environments only full desktop sessions are supported with H.264/AVC 444, RemoteApp sessions still use the proprietary codecs for now. 

This policy lets you enable hardware encoding for AVC/H.264, when used in conjunction with the AVC444 mode.


### Check Usage
- Applications and Services Logs 
	- Microsoft 
		- Windows 
			- RemoteDesktopServices-RdpCoreTS 

AVC 444
```Event 162
AVC available: 1, Initial profile: 2048
```


AVC hardware-acceleration
```Event 170
AVC hardware encoder enabled: 1
```


RendacACC
- Event 33: Remote Desktop Protocol will use the RemoteFX guest mode module to connect to the client computer.
- Event 162: The client supports version 0xA0200 of the RDP graphics protocol, client mode: 0, AVC available: 0, Initial profile: 2. Server: RENDACACC
- Event 132: A channel Microsoft::Windows::RDS::Video::Control::v08.01 has been connected between the server and the client using transport tunnel: 0.
	A channel rdpdr has been connected between the server and the client using transport tunnel: 0.
	A channel rdpgrfx has been connected between the server and the client using transport tunnel: 0.
- Event 166: The RemoteFX Adaptive Graphics internal configuration changed to optimize for the minimum use of network bandwidth. Server: RENDACACC