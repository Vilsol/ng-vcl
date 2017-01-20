import { ComponentWormhole } from './../../directives/wormhole/wormhole.module';
import { ComponentType } from './../../core/index';
import { LayerService } from './layer.service';
import { LayerRef, LayerData } from './layer.references';
export declare abstract class ComponentLayerRef<T> extends LayerRef {
    protected abstract component: ComponentType<T>;
    wormhole: ComponentWormhole<T>;
    initialize(layerService: LayerService): void;
    setData(data?: LayerData): void;
    readonly instance: T;
    createWormhole(data?: any): any;
}
