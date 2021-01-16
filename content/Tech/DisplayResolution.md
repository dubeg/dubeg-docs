---
date: 2018-08-17
title: Resolutions
menu:
    sidebar:
        parent: Tech
---

Both 1080p and 1080i have 1080 horizontal lines of vertical resolution which with a widescreen aspect ratio of 16:9 results in a resolution of 1920 × 1080 pixels (2.1 megapixels). It is not true that 1080i has a lower vertical resolution than 1080p.

Frames vs. fields
1080p is a frame-based or progressive-scan video where you are dealing with frames. You have frame rate and it is expressed in frames per second.

1080i is a field-based or interlaced or interleaved video where you are dealing with fields. You havefield rate and it is expressed in fields per second.

A field contains half of the lines of the frame, either even lines or odd lines, and if one field is composed of even lines, then the next one will be composed of odd lines and so on.

Frequencies
1080p has a frame rate of 25 frames per second for TV in PAL countries, 30/1.001 frames per second for TV in NTSC countries and 24 frames per second for cinematography.

1080i has a field rate of 50 fields per second for TV in PAL countries and 60/1.001 fields per second in NTSC countries.

(Note that it is not 30 frames and 60 fields per second for NTSC but actually 30/1.001 and 60/1.001which is approximately 29.97 and 59.94 but the difference is important. Read about the NTSC color encoding on Wikipedia to see why.)

How to think about it
1080p at 25 frames per second: Imagine that you are shooting 25 pictures per second and storing them as bitmaps. Every frame is a full picture from the given instant. Every pixel in that frame was captured at the same time.

1080i at 50 fields per second: Imagine that you are shooting 50 pictures per second but storing onlyhalf of the bitmaps every time – sometimes you store the odd lines and sometimes the even lines. (Note that it is not the same as storing pictures with lower vertical resolution.) Every field is a half of a full picture from the given instant. Every pixel in that field was captured at the same time.

50 halves ≠ 25 full pictures
Contrary to some comments here, interlaced video at 50 Hz does not mean that 25 full pictures per second are shown. It means that 50 halves of pictures are shown but those are halves of 50 different pictures that were shot at 50 distinct moments of time in every second. You not only don’t have 50 full pictures per second - you don’t have any full pictures at all.

Problems with 1080i
Interlacing causes a lot of problems. For example you can’t easily:

scale the video
rotate the video
make video slow motion
make video fast motion
pause the video
grab a still picture frame
play video in reverse
without doing some tricks and loosing quality. You don’t get any of those problems with progressive video. In addition the video encoding is harder because the codec never has a full frame to work with.

Problems with 1080p
The drawback is that 1080p as currently in use has a frame rate that is only half of the field rate of 1080i so the motion is noticeably less fluid – in fact it’s exactly twice less fluid which is a lot. You can see it on large flat TVs that often deinterlace the video to be able to display it on their LCD screens (that, unlike CRT displays, are progressive in nature) which is the cause that they display picture of very high resolution but with jerky motion and some deinterlacing artifacts.

Another problem is that usually 1080i is required for TV broadcasting which means that 1080p is simply out of the question for some applications.

Best of both worlds
Using progressive 1080p with 50 or 60/1.001 full frames per second in the future has a potential to eventually solve the above problems but it will require a whole new range of studio equipment including cameras, storage and editing systems so it probably won’t happen anytime soon. The widely used SDI standard for connecting HD video equipment doesn’t have enough bandwidth.

Currently the only way to have a fluid motion with progressive scanning is 720p that has a frame rate that is two times faster than 1080p but the resolution of only 1280 × 720 pixels (instead of 1920 × 1080 pixels) which may or may not be a problem for some applications. There is no 720i.

Conclusion
There is no one clear winner here.

Update: Here are some general guidelines to choose the right format:

Is it for high-definition TV? Use 1080i or whatever is required.
Is it for standard-definition TV? Use 720p and then convert to 576i or 480i.*
Is it for Internet and resolution is more important than fluid motion? Use 1080p.
Is it for Internet and fluid motion is more important than resolution? Use 720p.
(It all assumes that 1080p has a frame rate of 25 or 30/1.001 frames/s, 1080i has a field rate of 50 or 60/1.001 fields/s and 720p has a frame rate of 50 or 60/1.001 frames/s as is currently the case. Hopefully a high resolution progressive format like 1080p with a frame rate of 50 or 60/1.001 frames/s or maybe even higher will make this recommendation obsolete in the future.)

*) For number 2 make sure that your 720p has the frame rate of 50 fps if your target format is PAL or SECAM and 60/1.001 if your target format is NTSC (unfortunately it means that there is no format that can be converted to both PAL/SECAM and NTSC). The reason I recommend using 720p for recording is to greatly simplify the edition process when every frame is complete with no interlacing (throwing out every other line at the end is easier than creating the missing lines if you need them) and you have some extra resolution to work with so you can for example zoom the image slightly without making the result look blurry. (If anyone has any bad experience of using 720p to prepare material for SD PAL or NTSC TV broadcasting then please comment so I could update this recommendation.)