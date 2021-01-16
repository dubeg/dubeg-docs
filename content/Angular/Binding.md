---
date: 2019-08-07
title: Binding
menu:
    sidebar:
        parent: Angular
---

- Template binding works with properties and events (DOM), not attributes (HTML).
- Template binding maps an element's property to a statement.
    + Angular implements its own parser for template statements, 
      therefore not all javascript statements work within them.

```html
<x (event)="function(arg)" />
<x (event)="function($event)" />
<x [disabled]='condition ? true : false' />
```


## Input decorator
The `@Input()` decorator makes a component/directive's property available for template binding.

If a component's property isn't decorated with `@input`, binding to it won't work. This is a restriction by Angular to enforce isolation between components.



## Property binding [property]
Use property binding to set:

- Properties of elements, or
- Inputs of directives.
    + Properties decorated with `@Input()`, 
      or in the inputs array of the directive.


Notes

- Aka. `bind-<propertyName>`
- One-way in
    + E.g. `element.Property = component.Property`
- You cannot use property binding to call a method on the target element.


Examples
```
<x [disabled]='!isDirty' />
<x bind-disabled='!isDirty' />
<x [ngClass]='blue' /> 
```



## Event binding (event)
```
<x (event)="function()" />
<x (event)="function($event)" />
<x #element (event)="function(#element.value)" />
<x (event)="prop = $event;" />
```

Component
```
@Component({...})
export class xComponent {
    @Output() event = new EventEmitter<number>();
    fn() { this.event.emit(1); }
    ...
}
```

`$event`

+ Attaching to event of DOM element: $event is DOM event obj.
+ Attaching to event of component: $event can be any value.



## Two-way binding [()]
Two-way binding works with a component that has
a property named `y`, and a event named `yChange`.
```
<x [(y)]="prop" />
<x [y]="prop" (yChange)="prop=$event;" />
```

Component
```
@Component({...})
export class xComponent {
    @Input() y: number;
    @Output() yChange = new EventEmitter<number>();
    fn() { this.yChange.emit(1); }
}
```



## Class binding
```
<x [class.className]='boolExpression' />
```




## ViewChild and ContentChild
To read an element's property, or call one of its methods, use ViewChild/ContentChild within the component's code-behind.

