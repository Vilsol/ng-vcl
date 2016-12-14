import { ComponentRef, EmbeddedViewRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ComponentType } from './../../core/index';
export declare abstract class Wormhole {
    protected bridge: ConnectWormholeDirective;
    readonly isConnected: boolean;
    disconnect(): void;
    connect(bridge: ConnectWormholeDirective): void;
    abstract attach(): any;
    abstract detach(): any;
}
export declare class TemplateWormhole extends Wormhole {
    templateRef: TemplateRef<any>;
    viewRef: EmbeddedViewRef<any>;
    constructor(templateRef: TemplateRef<any>);
    attach(): void;
    detach(): void;
}
export declare class ComponentWormhole<T> extends Wormhole {
    private componentClass;
    compRef: ComponentRef<T>;
    constructor(componentClass: ComponentType<T>);
    attach(): void;
    detach(): void;
}
export declare class ConnectWormholeDirective {
    viewContainerRef: ViewContainerRef;
    componentFactoryResolver: ComponentFactoryResolver;
    private wormhole;
    private connectedWormhole;
    constructor(viewContainerRef: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver);
    readonly isConnected: boolean;
    indisposable: boolean;
    connectWormhole: Wormhole;
    connect(wormhole: Wormhole): void;
    disconnect(): void;
    ngOnDestroy(): void;
}
