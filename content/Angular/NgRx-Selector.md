---
date: 2019-08-07
title: NgRx-Selector
menu:
    sidebar:
        parent: Angular
---

Functions to retrieve data out of the store.
Store holds a reference to the root state.


Creators provide a few benefits vs just a fn returning a property from an object: memoization (optimization trick), and better null/undefined handling than dot notation.

- createFeatureSelector: get reference to a top-level property.
- createSelector


N = [1, 8]
```
export function createSelector<State, S1, ..., S8, Result>(
    s1: Selector<State, S1>, ...,
    s8: Selector<State, S8>,
    projector: (s1: S1, ..., s8: S8) => Result
): MemoizedSelector<State, Result>;
```



## Definition
```
export const getFeature = createFeatureSelector('feature');
export const getSelectedUser = createSelector(
    getFeature,
    (feature: Feature) => feature.selectedUser
);
export const getUsers = createSelector(
  getFeature,
  (feature: Feature) => feature.users
);
export const getUsersWithFilters = createSelector(
    getUsers,
    (users: User[], filters) => users.filter(u => 
        u.name === filters.name
        && u.age >= filters.minAge
        && u.age <= filters.maxAge
    )
);

```



## Usage
They all return an observable.
```
store.select('topLevelProperty');
store.select(rootState => rootState.property);
store.select(fromXYZ.getUsers);

store.pipe(
    select(fromStore.getFeaturePropertyFiltered, { y: ... })
);
```

