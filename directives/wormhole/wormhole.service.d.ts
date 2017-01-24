import { ApplicationRef, ComponentFactoryResolver, Injector, ComponentRef } from '@angular/core';
import { ComponentType } from './../../core/index';
export declare class WormholeService {
    private appRef;
    private componentFactoryResolver;
    private defaultInjector;
    bootstrapReady: Promise<any>;
    bootstrapReadyResolve: any;
    constructor(appRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, defaultInjector: Injector);
    ready(): void;
    attachComponent<T>(componentClass: ComponentType<T>, node?: HTMLElement): {
        componentRef: ComponentRef<T>;
        dispose: () => void;
    };
    getNode(node?: HTMLElement): Promise<any>;
    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement;
}
