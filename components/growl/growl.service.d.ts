import { GrowlOptions } from './types';
import { Growl } from './growl';
import { GrowlLayerTopRight, GrowlLayerBottomRight, GrowlLayerBottom, GrowlLayerBottomLeft, GrowlLayerTopLeft, GrowlLayerTop } from './growl.layer';
export declare class GrowlService {
    private growlLayerTopRightRef;
    private growlLayerBottomRightRef;
    private growlLayerBottomRef;
    private growlLayerBottomLeftRef;
    private growlLayerTopLeftRef;
    private growlLayerTopRef;
    constructor(growlLayerTopRightRef: GrowlLayerTopRight, growlLayerBottomRightRef: GrowlLayerBottomRight, growlLayerBottomRef: GrowlLayerBottom, growlLayerBottomLeftRef: GrowlLayerBottomLeft, growlLayerTopLeftRef: GrowlLayerTopLeft, growlLayerTopRef: GrowlLayerTop);
    growl(text: string, opts?: GrowlOptions): Growl;
    info(text: string, opts?: GrowlOptions): Growl;
    success(text: string, opts?: GrowlOptions): Growl;
    warning(text: string, opts?: GrowlOptions): Growl;
    error(text: string, opts?: GrowlOptions): Growl;
    private queue(...opts);
}
