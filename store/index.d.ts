import { ModuleWithProviders, Type, OpaqueToken } from '@angular/core';
import { Store, Reducer, Reducers, StoreState } from './store';
export * from './actions';
export * from './utils';
export * from './effects';
export * from './observable';
export * from './store';
export * from './router';
export declare const STORE_FORROOT_GUARD: OpaqueToken;
export declare function provideForRootGuard(store: Store): any;
export interface StoreConfig {
    reducers?: Reducer<any>[] | Reducers[] | Reducer<StoreState> | Reducers;
    effects?: Type<any>[];
    state?: any;
    enableRouter?: boolean;
}
export interface StoreChildConfig {
    reducers?: Reducer<any>[] | Reducers[] | Reducer<StoreState> | Reducers;
    effects?: Type<any>[];
}
export declare class StoreModule {
    constructor(guard: any);
    static forRoot(config: StoreConfig): ModuleWithProviders;
    static forChild(config: StoreChildConfig): {
        ngModule: typeof StoreModule;
        providers: ({
            provide: OpaqueToken;
            useClass: Type<any>;
            multi: boolean;
        } | {
            provide: OpaqueToken;
            multi: boolean;
            useValue: Reducer<StoreState>;
        })[];
    };
}
