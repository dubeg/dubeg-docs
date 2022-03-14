---
date: 2020-04-30
title: GPU Virtualization on Windows
menu:
    sidebar:
        parent: Virtualization
---


## John Mahowald
- Feb 18, 2019
- [serverfault.com/questions/954095/](https://serverfault.com/questions/954095/)

Now a brief survey of multi user graphics on Windows Server, from least to most use of graphics hardware.

Windows Advanced Rasterization Platform (WARP) is a software rasterizer that provides graphics via Direct3D without a GPU. This is the fallback software renderer.

In the category of paravirtualization there was Microsoft RemoteFX vGPU and VMware Virtual Shared Graphics Acceleration (vSGA). I say was because neither are being developed further, they got sick of maintaining an API shim.

Supposedly paravirt on Windows will be branded GPU-PV and Windows will understand partitioning as GPU-P. I cannot find a lot of documentation on this at the moment.

Graphics card vendors have their own sharing options, if you get a supported GPU and its drivers. Check hypervisor specific HCLs, XenServer is clear that vGPU is only on certain Nvidia Tesla models. In some cases, there is separate per user license fees for the technology.

- NVIDIA GRID vGPU
- AMD MxGPU
- Intel GVT-g

And then finally Direct Device Assignment (DDA), dedicating hardware to a VM. Expensive, and vastly complicates security, HA and live migration.



## Discrete Device Asssignment
In Windows Server 2019, it seems the GPU story is all about Discrete Device Assignment.



## Using GPU-P in Hyper-V
- Simon Bison
- January 6, 2020
- What's vNext for Windows Server?
- [techrepublic.com/index.php/article/whats-vnext-for-windows-server/](https://www.techrepublic.com/index.php/article/whats-vnext-for-windows-server/)

GPU-based compute is increasingly important, and Microsoft has been adding support for it in Azure. The partitioning tools give multiple VMs access to a physical GPU, sharing it between the VMs. Each VM has full access to its GPU partition, giving it a significant performance boost without affecting the other VMs. If a VM doesn't need GPU access, the partitions can be adjusted, ensuring that the GPU gets the best possible utilisation.
