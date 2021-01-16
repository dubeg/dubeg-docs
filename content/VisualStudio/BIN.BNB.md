---
date: 2017-08-17
title: Bin\BNB
menu:
    sidebar:
        parent: VisualStudio
---

If you happen to use Visual Studio on a HP ProBook laptop, or just any HP laptop I guess, you might find a directory called `\BNB\` under `\bin\` after compiling a project with msbuild, eg. when using Visual Studio or Visual Studio Code. It's probably caused by [HP Easy Setup](https://stackoverflow.com/questions/2507856/why-is-my-platform-environment-variable-defined-as-bnb), which is setting the system environment variable `PLATFORM` to `BNB`. I suggest removing it to avoid unexpected issues with Microsoft's dev tools. It should not reappear after reboot, unless the laptop is reset with the HP recovery image. After it is removed, just restart Visual Studio/Code and re-build. It should not compile to `\bin\BNB\debug` anymore.
