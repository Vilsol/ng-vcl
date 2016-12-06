import { LayerDirective } from './layer.component';
import { Observable } from 'rxjs/Observable';
export declare class LayerService {
    private layerNameMap;
    private layerMap;
    private visibleLayers;
    private _visibleLayers;
    constructor();
    visibleLayersFor(base?: string): Observable<LayerDirective[]>;
    getVisibleLayers(base?: string): LayerDirective[];
    hasVisibleLayers(base?: string): boolean;
    closeAll(base?: string): void;
    closeTop(base?: string): void;
    open(layerName: string, data?: any): Observable<any>;
    close(layerName: string): void;
    register(layer: LayerDirective): void;
    unregister(layer: LayerDirective): void;
    ngOnDestroy(): void;
}
