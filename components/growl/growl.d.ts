import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/merge';
import 'rxjs/observable/timer';
import 'rxjs/operator/first';
import { Subject } from 'rxjs/Subject';
import { GrowlOptions } from './types';
export declare class Growl extends Observable<any> {
    private opts;
    closeSubject: Subject<{}>;
    constructor(opts: GrowlOptions);
    state: string;
    close(): void;
    mouseEnter(): void;
    mouseLeave(): void;
    readonly text: string;
    readonly html: boolean;
    readonly showCloseButton: boolean;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly layerClass: string;
    readonly iconClass: string;
    readonly calculatedTimeout: number;
}
