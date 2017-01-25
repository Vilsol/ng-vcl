import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/fromEvent';
import { EventEmitter, ElementRef } from '@angular/core';
export declare class OffClickDirective {
    private elem;
    offClick: EventEmitter<{}>;
    private sub;
    constructor(elem: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
