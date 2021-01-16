---
date: 2019-08-07
title: NgRx-Reducer
menu:
    sidebar:
        parent: Angular
---

Handle state transitions in an immutable way.

- `InitialState`: provide a value if the current state is undefined.

Example:
```
export const abcReducer = createReducer(initialState,
    on(actionFn, (state, props) => { ...state, prop: <newValue> },
    on(actionFn, (state, props) => { ...state, prop: <newValue> },
);

export function reducer(state: <type>, action: Action) {
    return abcReducer(state, action);
}
```