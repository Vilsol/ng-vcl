import { Subscription } from 'rxjs/Subscription';
import 'rxjs/operator/debounceTime';
import { ChangeDetectorRef } from '@angular/core';
import { LayerService } from './layer.service';
import { LayerRef } from './layer.references';
export declare class LayerBaseComponent {
    private layerService;
    private cdRef;
    layerRefs: LayerRef[];
    sub: Subscription;
    name: string;
    zIndex: number;
    constructor(layerService: LayerService, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    offClick(layerRef: LayerRef): void;
}
