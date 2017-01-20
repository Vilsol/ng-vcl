import { OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class FileInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private elRef;
    state: 'busy' | 'error' | 'warning' | 'success';
    layout: 'horizontal' | 'vertical';
    placeholder: string;
    accept: string;
    name: string;
    disabled: boolean;
    multiple: boolean;
    value: string;
    files$: BehaviorSubject<FileList[]>;
    value$: Observable<any>;
    input: any;
    subs: any[];
    isDragging: boolean;
    isFocused: boolean;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
    onClick(value: any): void;
    onDrop(e: any): void;
    ngOnDestroy(): void;
    /**
     * things needed for ControlValueAccessor-Interface
     */
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(files: FileList): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
