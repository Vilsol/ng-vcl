import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
export declare class InitAction {
}
export interface Action {
    new (...args: any[]): any;
}
export declare class StoreActions extends Observable<any> implements Observer<any> {
    private _dispatcher;
    actions$: Observable<any>;
    source: Observable<any>;
    ofType(...actionClasses: Action[]): Observable<any>;
    dispatch(action: any): void;
    next(action: any): void;
    error(err: any): void;
    complete(): void;
}
