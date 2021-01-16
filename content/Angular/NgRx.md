---
date: 2019-08-07
title: NgRx
menu:
    sidebar:
        parent: Angular
---

- State management.
- Built on a single, immutable state object.
- Works very well with Angular's ChangeDetection system.

Details

- Action
    + An event (that you define for use in the NgRx system)
    + interface Action { type: string }
        - Type: `[Category] Description`
    + Can have as many metadata properties as needed, beside type.
    + Ex:
        - State change
        - UI event
        - Network request (?)
        - Device API event, 
        - Etc.
    + Events, not commands. Separation between event description vs handling.
    + Categorize actions based on the event source.

- Reducer
    + Handles state transitions of a specific piece of state 
      upon receiving specific actions.
    + Contains [1..N] of: (action, currentState) => newState
    + Usually handles an action upon which the state transitions
      from unloaded to loaded (as in, loaded from database).

- Effect
    + Handles side-effects upon specified actions being dispatched.
    + Effects are processed before reducers.
    + The effect might be to chain an action with an http request.
    + Ex: saving objects to database/etc.
    + Ex: fetching objects from database/etc.

- Selector
    + Function that retrieves data out of the store's state object.
    + A user essentially tells the store what data he wants 
      by giving it a selector, and the store gives him back
      an observable on that data.

- Dispatcher
    + ?

- Entity
    + ?