---
date: 2019-08-07
title: NgRx-Actions
menu:
    sidebar:
        parent: Angular
---


The `createAction` returns a function, that when called returns an object in the shape of the defined action.


```
export const booksLoaded = createAction(
    'BooksLoaded',
    props<{ books: Book[] }>()
);

export const booksLoaded = createAction(
    'BooksLoaded',
    (books: Book[] = []) => { books }
);

store.dispatch(booksLoaded({ books }));
```
