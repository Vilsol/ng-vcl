/// <reference types="core-js" />
import { EventEmitter, QueryList, ElementRef, OnInit, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * see
 * @link http://www.w3schools.com/tags/tag_option.asp
 */
export declare class SelectOptionComponent implements OnInit {
    private elementRef;
    value: string;
    sublabel: string;
    label: string;
    class: string;
    disabled: boolean;
    selected: boolean;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    /**
     * transforms this NavigationItemComponent into an object,
     * so it can be handled the same way as an inputList
     * @return {Object}
     */
    toObject(): Object;
}
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class SelectComponent implements ControlValueAccessor {
    private zone;
    tabindex: number;
    dropdown: any;
    select: any;
    value: any;
    expanded: boolean;
    items: any[];
    templateItems: QueryList<SelectOptionComponent>;
    minSelectableItems: number;
    maxSelectableItems: number;
    expandedIcon: string;
    collapsedIcon: string;
    displayValue: string | string[];
    changeEE: EventEmitter<string | string[]>;
    me: ElementRef;
    constructor(me: ElementRef, zone: NgZone);
    expand(): void;
    keydown(ev: any): void;
    doTap(ev: any): void;
    onFocus(event?: any): Promise<void>;
    onBlur(event?: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    dropdownTop: number;
    dropDirection: 'top' | 'bottom';
    /**
     * calculate if the dropdown should be displayed above or under the select-input
     */
    calculateDropDirection(): Promise<void>;
    reDisplayValue(newValue: any): void;
    unselectItem(item: any): void;
    displayValueTokens(): boolean;
    selectItem(item: any): void;
    onSelect(newValue: any[]): void;
    /**
     * Things needed for ControlValueAccessor-Interface.
     */
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
