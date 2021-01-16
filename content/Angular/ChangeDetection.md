# Change Detection
- Unidirectional data flow.
    + From top to bottom.
- No component lower in hierarchy allowed to update properties
  of a parent after parent changes have been checked (aka. processed).
- Ran on every asynchronous event of the JS engine/V.M. (aka. browser event).
- Uses `zone` to patch all async events.
    + subscribes to `onMicrotaskEmpty` event
        - gets notified when an async event is completed.
        - onMicrotask event fired when no more microtasks enqueued
          in current VM turn/tick.
    + no manual triggering required for most events.
- Can be triggered manually.
    + `view.detectChanges`
    + `ApplicationRef.tick`



## Default strategy
By default, the changeDetection system walks the whole tree.
It is this way to handle mutable objects: with them, you don't know
when their properties change, and so Angular needs to be conservative by 
checking every component everytime a browser event occurs. This may become
a performance problem.

If you use immutable objects or observables, you can take advantage
of a more performant strategy: OnPush.



## Immutable Objects
Change Detection works best with immutable objects 
as inputs (@Input) to child components.

If a component depends only on its input properties,
and they are immutable, then the component can change if and only if
one of its inputs change. Therefore, we can skip the component's subtree
in the changeDetection tree until this occurs.

When it happens, the subtree is checked once, then disabled (the changeDetector, that is)
until the next change occurs. This is the OnPush strategy of changeDetection.

A component can still have private mutable state as long as it changes due
to:
- inputs being changed,
- event being fired from within the template.



## Observable Objects
If a component depends only on its inputs, and they are observable,
then the component can change if and only if one of its inputs emit an event.
Therefore, we can skip the component's subtree in the changeDetection subtree 
until such an event occurs. 


__Difference with the Immutable Objects case__

If you have a tree of components with immutable bindings, a change has to go through
all the components starting from the top/root. This is not the case when dealing with
observables.


An event triggered by an observable just marks a path from the component
to the root as to be checked next time. Then, the normal changeDetection process 
kicks in and goes through the nodes of the tree from top to bottom.



## Advices
- Application state that is passed around is modeled using immutable objects.
- Components can have local state that can only be updated when their inputs change,
  or an event is emitted in their templates.





## Component
Every component has a changeDetector responsible
for checking bindings used in its template.

Example
```
{{ user.name }}
<x [target]="user"></x>
```






## Cycle
Operations performed by change detection mechanism
when checking a component.

1. Update bound properties (@Input) on children.
2. Call OnInit, OnChanges, DoCheck on children.
3. Update DOM of component.
4. Run change detection on children (back to 1?)
5. Call AfterViewInit on children.





## Hooks
- OnChanges: to track parent's bound properties (@Input).
- DoCheck
    + to track component's properties and calculate computed properties.
    + called before component's DOM/UI is updated.
- OnInit
    + attach events
        - say, in non-Angular components, attach eventHandler that calls `detectChanges`.



## Strategy: OnPush
Ways CD is triggered for a component:

- @Input bindings changed.
- Events within the component (ex: button click).
- New emitted values in template bindings using the async pipe.



## References
- https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c
- https://vsavkin.com/immutability-vs-encapsulation-90549ab74487
