import { TemplateRef, ChangeDetectorRef } from '@angular/core';
import { TemplateWormhole } from './../../directives/wormhole/wormhole.module';
import { LayerService } from './layer.service';
import { LayerRef, LayerData } from './layer.references';
export interface LayerData {
    [key: string]: any;
}
export declare class DirectiveLayerRef extends LayerRef {
    templateRef: TemplateRef<any>;
    private layerService;
    private cdRef;
    modal: boolean;
    offClickClose: boolean;
    base: string;
    transparent: boolean;
    fill: boolean;
    stickToBottom: boolean;
    gutterPadding: boolean;
    customClass: string;
    constructor(templateRef: TemplateRef<any>, layerService: LayerService, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    createWormhole(): TemplateWormhole;
    setData(data?: LayerData): void;
}
