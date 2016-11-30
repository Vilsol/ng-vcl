import { OnDestroy, OpaqueToken } from '@angular/core';
import { Store } from './store';
export declare const STORE_EFFECTS: OpaqueToken;
export declare function Effect(): PropertyDecorator;
export declare function getEffectsMetadata(instance: any): string[];
export declare class Effects implements OnDestroy {
    private store;
    private effectSubs;
    constructor(store: Store, effects: any[]);
    addEffects(effectInstances: any | any[]): void;
    ngOnDestroy(): void;
}
