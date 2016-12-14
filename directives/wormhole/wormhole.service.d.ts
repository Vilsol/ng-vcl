/// <reference types="core-js" />
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
        ();
    };
    getNode(node?: HTMLElement): Promise<HTMLElement>;
    getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement;
}
