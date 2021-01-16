# History of Virtualization on Windows



John Mahowald  
serverfault.com/questions/954095/poor-mans-virtual-gpu-using-a-multiuser-os-gpu-instead-of-specialist-vgpu-c  
brianmadden.com/opinion/RemoteFX-vGPU-put-out-to-pasture-as-Microsoft-RDP-grows-up

Now a brief survey of multi user graphics on Windows Server, from least to most use of graphics hardware.

Windows Advanced Rasterization Platform (WARP) is a software rasterizer that provides graphics via Direct3D without a GPU. This is the fallback software renderer.

In the category of paravirtualization there was Microsoft RemoteFX vGPU and VMware Virtual Shared Graphics Acceleration (vSGA). I say was because neither are being developed further, they got sick of maintaining an API shim.

Supposedly paravirt on Windows will be branded GPU-PV and Windows will understand partitioning as GPU-P. I cannot find a lot of documentation on this at the moment.

Graphics card vendors have their own sharing options, if you get a supported GPU and its drivers. Check hypervisor specific HCLs, XenServer is clear that vGPU is only on certain Nvidia Tesla models. In some cases, there is separate per user license fees for the technology.

NVIDIA GRID vGPU
AMD MxGPU
Intel GVT-g
And then finally Direct Device Assignment (DDA), dedicating hardware to a VM. Expensive, and vastly complicates security, HA and live migration.



## Discrete Device Asssignment
In Windows Server 2019, it seems the GPU story is all about Discrete Device Assignment.



## Using GPU-P in Hyper-V
GPU-based compute is increasingly important, and Microsoft has been adding support for it in Azure. The partitioning tools give multiple VMs access to a physical GPU, sharing it between the VMs. Each VM has full access to its GPU partition, giving it a significant performance boost without affecting the other VMs. If a VM doesn't need GPU access, the partitions can be adjusted, ensuring that the GPU gets the best possible utilisation.


## Moving applications to Windows Containers
Windows Containers are an important part of the future of Windows Server, acting as a new deployment target for your applications. Microsoft has spent the last couple of years rethinking the role of what was Windows Server Nano, using it as the basis for a stripped-down application host that provides the basis for Windows Container applications. It boots quickly, and provides the minimum services needed for an application. More complicated applications can take advantage of Windows Server Core, which has been substantially slimmed down, making it easier to customise for specific tasks.