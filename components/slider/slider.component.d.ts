import { ControlValueAccessor } from '@angular/forms';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class SliderComponent implements ControlValueAccessor {
    tabindex: number;
    value: number;
    min: number;
    max: number;
    step: number;
    stepsOnly: boolean;
    round: number;
    scaleNames: string[];
    scale: any;
    constructor();
    ngAfterContentInit(): void;
    percentLeftKnob: number;
    scalePoints: any[];
    calculatePercentLeftKnob(): number;
    percentToValue(per: number): number;
    getScalePoints(): void;
    closestScalePoint(percentValue: any): number;
    scalePointLabel(i: number): string;
    deltaPxToPercent(deltaPx: number): number;
    /**
     * clicking the rail should also reposition the bar
     */
    onTap(event: any): void;
    moveToPoint(direction?: 'left' | 'right'): void;
    moveValue(direction?: 'left' | 'right'): void;
    keydown(ev: any): void;
    lastPercentLeftKnob: number;
    firstPan: boolean;
    onPan(ev: any): void;
    /**
     * things needed for ControlValueAccessor-Interface
     */
    private onTouchedCallback;
    private onChangeCallback;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
