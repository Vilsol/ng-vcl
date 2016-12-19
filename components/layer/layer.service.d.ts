import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ComponentType } from './../../core/index';
import { LayerBaseComponent } from './layer-base.component';
import { LayerDirective } from './layer.directive';
import { LayerReference, LayerDirectiveReference, LayerComponentReference, LayerOptions } from './layer.references';
export declare class LayerService {
    private defaultInjector;
    private baseNameMap;
    private layerDirectiveMap;
    private layers;
    private layersChange;
    constructor(defaultInjector: Injector);
    getVisibleLayersFor$(base?: string): Observable<LayerReference[]>;
    getLayersFor(base?: string): LayerReference[];
    getVisibleLayersFor(base?: string): LayerReference[];
    hasVisibleLayers(base?: string): boolean;
    closeAll(base?: string): void;
    closeTop(base?: string): void;
    registerComponent<T>(layer: ComponentType<T>, opts?: LayerOptions): LayerComponentReference<T>;
    registerDirective(layer: LayerDirective, opts?: LayerOptions): LayerDirectiveReference;
    private registerReference(layerRef);
    disposeReference(layerRef: LayerReference): void;
    unregisterDirective(layer: LayerDirective): void;
    registerBase(layerBase: LayerBaseComponent, opts?: LayerOptions): void;
    unregisterBase(layerBase: LayerBaseComponent): void;
    ngOnDestroy(): void;
}
