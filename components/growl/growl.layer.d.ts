import { ComponentLayerRef } from './../layer/layer.module';
import { GrowlComponent } from './growl.component';
import { Growl } from './growl';
export declare abstract class GrowlLayer extends ComponentLayerRef<GrowlComponent> {
    component: typeof GrowlComponent;
    transparent: boolean;
    offClickClose: boolean;
    abstract reverse: boolean;
    growls: Growl[];
    add(growl: Growl): Growl;
    remove(growl: Growl): void;
}
export declare class GrowlLayerTopRight extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
export declare class GrowlLayerTop extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
export declare class GrowlLayerTopLeft extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
export declare class GrowlLayerBottomRight extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
export declare class GrowlLayerBottom extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
export declare class GrowlLayerBottomLeft extends GrowlLayer {
    customClass: string;
    reverse: boolean;
}
