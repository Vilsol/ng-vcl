import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
export interface Action {
    new (...args: any[]): any;
}
export declare class StoreActions extends Observable<any> implements Observer<any> {
    private _dispatcher;
    actions$: Observable<any>;
    source: Observable<any>;
    constructor();
    ofType(...actionClasses: Action[]): Observable<any>;
    dispatch(action: any): void;
    next(action: any): void;
    error(err: any): void;
    complete(): void;
}
