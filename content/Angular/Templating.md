---
date: 2018-08-17
title: Templating
menu:
    sidebar:
        parent: Angular
---


## NgTemplate

Represents a template.
ie., a tag with content.

```html
<ng-template>
</ng-template>
```





## NgContainer
Provides an element on which we can apply structural directives,
without having to create divs, because we are limited to one structural directive per element.

It can also be used as placeholder for injecting a template dynamically.

```html
<ng-container *ngIf="names">
    <div class="names" *ngFor="let name of names">
        <div>{{ name }}</div>
    </div>
</ng-container>
```




### Instanciate templates
The `NgTemplate` directive as defined above only defines the template. To actually make it render, we can use a `NgContainer` directive with the template's id set in the attribute ngTemplateOutlet.

```html
<ng-container *ngTemplateOutlet="loading">
</ng-container>

<ng-template #loading>
    <div>Loading</div>
</ng-template>
```



## Template context
What's accessible within a template?

Inside an `NgTemplate` element, we can use variables that are accessible from the outer template.
This is possible because `NgTemplate` instances have implicit access to the context in which they're embedded. We can also set the context of a template explicitely.

In this case, the context property is set to an object named `ctx` which has a `percentage` property.
```html
<ng-template #loading let-pct="percentage">
    <div>Loading: {{ pct }}% </div>
</ng-template>

<ng-container *ngTemplateOutlet="loading; context:ctx">
</ng-container>
```



## References
To reference an element within a template:
```
<video-player #player></video-player> 
<button (click)="player.pause()">Pause</button>

<input #i> 
<span>{{i.value}}</span>
```