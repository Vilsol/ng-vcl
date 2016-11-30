import { Observable } from 'rxjs/Observable';
export declare function select<T, U>(this: Observable<U>, path: {
    (value: U): T;
} | string, ...paths: string[]): StoreObservable<T>;
export declare class StoreObservable<T> extends Observable<T> {
    constructor(source: any);
    select<U>(path: {
        (value: T): U;
    } | string, ...paths: string[]): StoreObservable<U>;
    lift(operator: any): StoreObservable<T>;
}
