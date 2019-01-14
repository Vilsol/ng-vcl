import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCLIconModule } from './../icon/index';
import { VCLFormControlLabelModule } from './../form-control-label/index';
import { CheckboxComponent } from './checkbox.component';

export { CheckboxComponent };

@NgModule({
  imports: [CommonModule, VCLIconModule, VCLFormControlLabelModule],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent]
})
export class VCLCheckboxModule { }
