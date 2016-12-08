import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import { OpaqueToken } from '@angular/core';
import { StoreActions } from './actions';
import { StoreObservable } from './observable';
export declare const STORE_INITIAL_REDUCERS: OpaqueToken;
export declare const STORE_INITIAL_STATE: OpaqueToken;
export interface StoreState {
    [key: string]: any;
}
export interface Reducer<TState> {
    (state: TState, action: any): TState;
}
export interface Reducers {
    [key: string]: Reducer<any>;
}
export declare class Store extends Observable<any> implements Observer<StoreState> {
    private actions$;
    private initialState;
    private initialReducers;
    constructor(actions$: StoreActions, initialState: any, initialReducers: Reducer<StoreState>[]);
    private _reducer;
    private readonly reducer$;
    state$: ConnectableObservable<StoreState>;
    stateSub: Subscription;
    source: ConnectableObservable<StoreState>;
    replaceReducer(reducer: Reducer<StoreState> | Reducers): void;
    dispatch(action: any): void;
    select<U>(path: {
        (value: any): U;
    } | string, ...paths: string[]): StoreObservable<U>;
    next(action: any): void;
    error(err: any): void;
    complete(): void;
    ngOnDestroy(): void;
}
