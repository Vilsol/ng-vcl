import { LayerData } from './layer.directive';
import { Observable } from 'rxjs/Observable';
import { TemplateRef, ElementRef } from '@angular/core';
import { TemplateWormhole } from './../../directives/wormhole/wormhole.module';
import { LayerService } from './layer.service';
import { LayerDirectiveReference } from './layer.references';
export interface LayerData {
    [key: string]: any;
}
export declare class LayerDirective extends TemplateWormhole {
    templateRef: TemplateRef<any>;
    private elementRef;
    private layerService;
    modal: boolean;
    closeOnOffClick: boolean;
    base: string;
    layerRef: LayerDirectiveReference;
    constructor(templateRef: TemplateRef<any>, elementRef: ElementRef, layerService: LayerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    open(data?: LayerData): Observable<any>;
    send(result: any): void;
    close(result?: any): void;
}
