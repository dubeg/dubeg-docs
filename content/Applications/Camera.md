---
date: 2021-05-19
title: Camera
menu:
    sidebar:
        parent: Applications
---

Camera settings
- Brightness
    + Set a value within the built-in Camera app in Windows.
- Exposure
    + Set to automatic by default.
    + To change it manually:
        - Install FFMPEG.
        - Get the device name of the camera: `.\ffmpeg.exe -list_devices true -f dshow -i dummy -hide_banner`
        - Launch the configurator: 
            + Cmd: `.\ffmpeg.exe -f dshow -show_video_device_dialog true -i video="<deviceName>"`
            + Ex:  `.\ffmpeg.exe -f dshow -show_video_device_dialog true -i video="Integrated Webcam"`