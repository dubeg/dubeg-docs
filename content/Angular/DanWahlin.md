---
date: 2019-08-07
title: Dan Wahlin
menu:
    sidebar:
        parent: Angular
---


- Subject
    + Emit values from subscription onwards.
- BehaviorSubject
    + Initial value (optional)
    + Retains last value.
    + Emit last value received & from subscription onwards.
- ReplaySubject
    + Like BehaviorSubject, but can re-emit any value it ever received.
- AsyncSubject
    + Emits last value (and only that) of the sequence, then completes.



## Technique: Event Bus
- EmitEvent
    + type: enum
    + payload
- EventBusService
    + subject$
    + emit(event: EmitEvent)
        - subject$.next(event)
    + on(type: enum, action: any): Subscription
        - subject$.pipe(filter(e => e.type === type), map(e => e.payload)).subscribe(action);



## Technique: Service Bus
```
export class InventoryService {
    private itemSubject$ = new BehaviorSubject<Item>();
    itemAdded$ = this.itemSubject$.asObservable();
    
    add(item: Item) {
        this.inventorySubject$.next(item);
    }
}

export class InventoryComponent ... {
    ngOnInit() {
        this.subsink = this.svc.itemAdded$.subscribe(
            item => this.items.push(item);
        );
    }
}
```


## Observable Store
An alternative to larger state management framework.
Check the article on Dan's blog.




## References
[Mastering the Subject: Communication Options in RxJS | Dan Wahlin](https://www.youtube.com/watch?v=_q-HL9YX_pk)

[Observable Store](https://github.com/DanWahlin/Observable-Store)
