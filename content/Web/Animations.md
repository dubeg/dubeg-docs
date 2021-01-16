---
date: 2018-09-27
title: Animations
menu:
    sidebar:
        parent: Web
---


- animation-timing-function
    + ease, 
    + ease-out, 
    + ease-in, 
    + ease-in-out, 
    + linear, 
    + cubic-bezier(x1, y1, x2, y2)
- animation-duration: s or ms
- animation-delay: s or ms
- animation-iteration-count: <n>, infinite
- animation-fill-mode
    + forwards, 
    + backwards, 
    + both, 
    + none
- animation-direction
    + normal, 
    + alternate
- animation-play-state
    + paused,
    + running


Note:  
Add inter-state same as last step to "delay" or maintain a state longer (without directly transitioning to the next step).

Example:
```css
@keyframes
{
    0%{ left:0; }
    33% {}
    50% {left: 10px;}
    66%;
    100% {left:20px;}

}
```