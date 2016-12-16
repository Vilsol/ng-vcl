import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, TemplateRef, ElementRef } from '@angular/core';
import { TemplateWormhole } from './../../directives/wormhole/wormhole';
import { LayerService } from './layer.service';
export interface LayerData {
    [key: string]: any;
}
export declare class LayerDirective extends TemplateWormhole {
    templateRef: TemplateRef<any>;
    private elementRef;
    private layerService;
    visibilityChange$: EventEmitter<boolean>;
    readonly visibilityChange: Observable<boolean>;
    modal: boolean;
    closeOnOffClick: boolean;
    name: string;
    base: string;
    _instanceResults: Subject<any>;
    data: LayerData;
    readonly state: string;
    visible: boolean;
    constructor(templateRef: TemplateRef<any>, elementRef: ElementRef, layerService: LayerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    offClick(): void;
    toggle(): void;
    open(data?: LayerData): Observable<any>;
    send(result: any): void;
    close(result?: any): void;
}
export declare class LayerBaseComponent {
    private layerService;
    visibleLayers: LayerDirective[];
    sub: Subscription;
    name: string;
    zIndex: number;
    constructor(layerService: LayerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
