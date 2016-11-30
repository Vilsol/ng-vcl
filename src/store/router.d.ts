import { Store, Reducer } from './store';
import { StoreActions } from './actions';
import { Router, NavigationExtras } from '@angular/router';
export interface RouterState {
    url: string;
}
export declare const initialRouterState: RouterState;
export declare class RouterNavigateAction {
    commands: any[];
    extras: NavigationExtras;
    constructor(commands: any[], extras?: NavigationExtras);
}
export declare class RouterUrlUpdateAction {
    url: string;
    constructor(url: string);
}
export declare class StoreRouter {
    private router;
    private store;
    private actions$;
    constructor(router: Router, store: Store, actions$: StoreActions);
    private routerSub;
    navigate(commands: any[], extras?: NavigationExtras): void;
    ngOnDestroy(): void;
}
export declare const routerReducer: Reducer<RouterState>;
