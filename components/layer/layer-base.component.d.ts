import { Subscription } from 'rxjs/Subscription';
import { ChangeDetectorRef } from '@angular/core';
import { LayerService } from './layer.service';
import { LayerReference } from './layer.references';
export declare class LayerBaseComponent {
    private layerService;
    private cdRef;
    layerRefs: LayerReference[];
    sub: Subscription;
    name: string;
    zIndex: number;
    constructor(layerService: LayerService, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    offClick(layerRef: LayerReference): void;
}
