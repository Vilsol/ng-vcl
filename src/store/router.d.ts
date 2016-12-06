import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Router, NavigationExtras, UrlTree } from '@angular/router';
import { Store, Reducer } from './store';
import { StoreActions } from './actions';
export interface RouterState {
    url: string;
}
export declare const initialRouterState: RouterState;
export declare class RouterNavigateAction {
    commands: any[];
    extras: NavigationExtras;
    constructor(commands: any[], extras?: NavigationExtras);
}
export declare class RouterNavigateByUrlAction {
    url: string | UrlTree;
    extras: NavigationExtras;
    constructor(url: string | UrlTree, extras?: NavigationExtras);
}
export declare class RouterUrlUpdateAction {
    url: string;
    constructor(url: string);
}
export declare class StoreRouterEffects {
    private router;
    private store;
    private actions$;
    constructor(router: Router, store: Store, actions$: StoreActions);
    private routerSub;
    private navigateEffect;
    private navigateByUrlEffect;
    ngOnDestroy(): void;
}
export declare class StoreRouter {
    private store;
    constructor(store: Store);
    navigate(commands: any[], extras?: NavigationExtras): void;
    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): void;
}
export declare const routerReducer: Reducer<RouterState>;
