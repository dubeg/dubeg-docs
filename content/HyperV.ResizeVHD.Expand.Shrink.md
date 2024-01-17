Resize-VHD
	-Path
	-SizeBytes
		* New total size.
		* If lower than current disk size, then disk is shrinked (if possible).
		* If higher, then disk is expanded.

Notes
- All types can be expanded/grow.
- VHD can't be shrinked.
- VHDX can be shrinked, but only down to its MinimumSize.

Examples
```
Resize-VHD -Path disk.vhdx -SizeBytes 1099511627776
Resize-VHD -Path disk.vhdx -SizeBytes 20GB
```
