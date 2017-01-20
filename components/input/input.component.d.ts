import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class InputComponent implements OnInit, OnDestroy {
    private elRef;
    state: 'error' | 'warning' | 'success';
    type: string;
    selectOnFocus: boolean;
    value: any;
    _valueSubject: BehaviorSubject<any>;
    typedValueChange: Observable<any>;
    subs: any[];
    constructor(elRef: ElementRef);
    ngOnInit(): void;
    toType(value: any): any;
    onChange(value: any): void;
    onFocus(value: any): void;
    ngOnDestroy(): void;
}
