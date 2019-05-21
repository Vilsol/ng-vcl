import { Component } from '@angular/core';
import { VCLFormFieldSchemaSelect, VCLFormFieldSchemaSelectParams } from '../schemas';
import { FormFieldControl } from './field';

export class FormFieldSelect extends FormFieldControl<VCLFormFieldSchemaSelect, VCLFormFieldSchemaSelectParams> {
  get selectionMode(): 'multiple' | 'single' {
    return this.params.selectionMode || 'single';
  }
  get placeholder()  {
    return this.params.placeholder || '';
  }
  get options()  {
    return this.params.options || [];
  }
  protected createDefaultValue() {
    return this.selectionMode === 'single' ? null : [];
  }

}

@Component({
  template: `
  <vcl-form-control-group *ngIf="field.visible">
    <label *ngIf="!!field.label" vclFormControlLabel>{{field.label}}<vcl-required *ngIf="field.required"></vcl-required></label>
    <vcl-select [placeholder]="field.placeholder">
      <vcl-select-list [formControl]="field.control" [errorStateAgent]="field.errorStateAgent" [selectionMode]="field.selectionMode">
        <vcl-select-list-item *ngFor="let option of field.options" [value]="option.value">
          <vcl-select-list-label>{{option.label}}</vcl-select-list-label>
          <vcl-select-list-sublabel *ngIf="option.sublabel">{{option.sublabel}}</vcl-select-list-sublabel>
        </vcl-select-list-item>
      </vcl-select-list>
    </vcl-select>
    <vcl-jss-form-hints></vcl-jss-form-hints>
  </vcl-form-control-group>
  `
})
export class FormFieldSelectComponent {
  constructor(public field: FormFieldSelect) { }
}

FormFieldControl.register('select', FormFieldSelectComponent, FormFieldSelect);
