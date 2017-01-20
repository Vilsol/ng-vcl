import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/filter';
import 'rxjs/operator/map';
import 'rxjs/operator/distinctUntilChanged';
import { LayerBaseComponent } from './layer-base.component';
import { LayerRef } from './layer.references';
export declare class LayerService {
    private bases;
    private visibleLayers;
    private layers;
    private layerChange;
    layerChange$(base?: string): Observable<LayerRef>;
    visibleLayersChange$(base?: string): Observable<LayerRef[]>;
    getLayers(base?: string): LayerRef[];
    getVisibleLayers(base?: string): LayerRef[];
    hasVisibleLayers(base?: string): boolean;
    closeAll(base?: string): void;
    closeTop(base?: string): void;
    register(layerRef: LayerRef): void;
    unregister(layerRef: LayerRef): void;
    registerBase(layerBase: LayerBaseComponent): void;
    unregisterBase(layerBase: LayerBaseComponent): void;
    ngOnDestroy(): void;
}
