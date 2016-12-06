import { ModuleWithProviders, Type } from '@angular/core';
import { Reducer, Reducers, StoreState } from './store';
export * from './actions';
export * from './utils';
export * from './effects';
export * from './observable';
export * from './store';
export * from './router';
export interface StoreConfig {
    reducers?: Reducer<any>[] | Reducers[] | Reducer<StoreState> | Reducers;
    effects?: Type<any>[];
    state?: any;
    enableRouter?: boolean;
}
export declare class StoreModule {
    static forRoot(config: StoreConfig): ModuleWithProviders;
}
