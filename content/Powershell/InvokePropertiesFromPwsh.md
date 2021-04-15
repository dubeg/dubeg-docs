```
$o = new-object -com Shell.Application
$folder = $o.NameSpace("C:\path\to\file")
$file = $folder.ParseName("filename.txt")

# Folder:
$folder.Self.InvokeVerb("Properties")

# File:
$file.InvokeVerb("Properties")
```