import { ComponentRef, ComponentFactory, EmbeddedViewRef, TemplateRef, ViewContainerRef, Injector } from '@angular/core';
import { ComponentType } from './../../core/index';
export declare abstract class Wormhole {
    readonly abstract isConnected: boolean;
    abstract connect(viewContainerRef: ViewContainerRef): any;
    abstract disconnect(): any;
}
export declare class TemplateWormhole extends Wormhole {
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
    viewRef: EmbeddedViewRef<any>;
    constructor(templateRef: TemplateRef<any>);
    readonly isConnected: boolean;
    connect(viewContainerRef: ViewContainerRef): void;
    disconnect(): void;
}
export declare class ComponentWormhole<T> extends Wormhole {
    private componentClass;
    viewContainerRef: ViewContainerRef;
    compFactory: ComponentFactory<T>;
    compRef: ComponentRef<T>;
    injector: Injector;
    data: any;
    constructor(componentClass: ComponentType<T>, initialData?: any);
    readonly isConnected: boolean;
    connect(viewContainerRef: ViewContainerRef): void;
    disconnect(): void;
    private initializeComponent();
    private destroyComponent();
    protected createInjector(): Injector;
    setData(data?: any): void;
}
export declare class ConnectWormholeDirective {
    viewContainerRef: ViewContainerRef;
    private wormhole;
    constructor(viewContainerRef: ViewContainerRef);
    readonly isAttached: boolean;
    connectWormhole: Wormhole;
    attach(wormhole: Wormhole): void;
    detach(): void;
    ngOnDestroy(): void;
}
