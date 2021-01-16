---
date: 2019-08-07
title: NgRx-Effect
menu:
    sidebar:
        parent: Angular
---


```
addBookToCollection$ = createEffect(() =>
    this.actions$.pipe(
        ofType(xyz.addBook),
        mergeMap( {book} => 
            this.svc.addToCollection([book]).pipe(
                map(() => abc.addBookSuccess({book})),
                catchError(() => of(abc.addBookFailure({book}))
            )
        )
    )
);
```