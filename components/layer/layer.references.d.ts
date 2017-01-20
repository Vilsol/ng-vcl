import { Observable } from 'rxjs/Observable';
import { Wormhole } from './../../directives/wormhole/wormhole.module';
export interface LayerData {
    [key: string]: any;
}
export declare abstract class LayerRef {
    private results;
    private visibilityChange;
    private _visible;
    readonly visible: boolean;
    visible$: Observable<boolean>;
    base: string;
    modal: boolean;
    offClickClose: boolean;
    transparent: boolean;
    fill: boolean;
    stickToBottom: boolean;
    gutterPadding: boolean;
    customClass: string;
    wormhole: Wormhole;
    private setVisibility(value);
    open(data?: LayerData): Observable<any>;
    close(data?: any): void;
    closeWithError(data?: any): void;
    send(data: any): void;
    offClick(): void;
    protected abstract setData(data: LayerData): any;
    protected abstract createWormhole(data?: any): Wormhole;
}
