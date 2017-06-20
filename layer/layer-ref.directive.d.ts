import { TemplateRef, Injector } from '@angular/core';
import { LayerRef } from './layer-ref';
import { LayerOptions } from "./layer-container.component";
import { LayerManagerService } from "./layer-manager.service";
export declare class LayerRefDirective extends LayerRef implements LayerOptions {
    templateRef: TemplateRef<any>;
    private layerManager;
    private injector;
    modal: boolean;
    transparent: boolean;
    fill: boolean;
    stickToBottom: boolean;
    gutterPadding: boolean;
    customClass: string;
    constructor(templateRef: TemplateRef<any>, layerManager: LayerManagerService, injector: Injector);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
