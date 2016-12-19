import { ReflectiveInjector, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Wormhole, ComponentWormhole } from './../../directives/wormhole/wormhole.module';
import { ComponentType } from './../../core/index';
import { LayerDirective } from './layer.directive';
export interface LayerOptions {
    modal?: boolean;
    closeOnOffClick?: boolean;
    base?: string;
}
export interface LayerData {
    [key: string]: any;
}
export declare abstract class LayerReference extends Observable<any> {
    private results;
    private stateChange;
    source: Observable<LayerReference>;
    visible: boolean;
    modal: boolean;
    closeOnOffClick: boolean;
    base: string;
    data: any;
    wormhole: Wormhole;
    constructor(opts: LayerOptions);
    open(data?: LayerData): Observable<any>;
    close(result?: any): void;
    send(result: any): void;
    abstract createWormhole(): any;
}
export declare class LayerDirectiveReference extends LayerReference {
    private layer;
    constructor(opts: LayerOptions, layer: LayerDirective);
    createWormhole(): LayerDirective;
}
export declare class LayerComponentReference<T> extends LayerReference {
    private defaultInjector;
    private LayerClass;
    injector: ReflectiveInjector;
    constructor(opts: LayerOptions, defaultInjector: Injector, LayerClass: ComponentType<T>);
    createWormhole(): ComponentWormhole<any>;
}
