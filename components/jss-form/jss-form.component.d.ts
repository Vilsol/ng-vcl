/// <reference types="core-js" />
import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
export declare class JssFormObjectComponent implements OnInit, OnDestroy {
    schema: any;
    parentPath: string;
    formGroup: FormGroup;
    error: any;
    fieldErrors: {};
    subs: any[];
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * if no formType is given, this will guess the right one
     */
    formType(schemaObj: any): string;
    keys(obj: any): string[];
    keyErrors(parentPath: any, key: any): any;
    keyErrors$(parentPath: any, key: any): Observable<{}>;
    name(parentPath: any, key: any): string;
    placeholder(schemaObj: any): any;
    radioOptions(schemaObj: any): any;
    selectItems(schemaObj: any): any;
}
export declare class JssFormComponent implements OnInit {
    fb: FormBuilder;
    schema: any;
    value: Object;
    error: EventEmitter<any[]>;
    form: any;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    keys(obj: any): string[];
    /**
     * create the formGroup for the given schema
     */
    formGroupFromSchema(schemaObj: any): FormGroup;
    /**
     * validate if value matches schema
     * @return {?any[]} error-array or null if no errors
     */
    jsonSchemaValidate(obj: Object, schema?: any): Object[] | null;
    ngAfterViewInit(): void;
}
