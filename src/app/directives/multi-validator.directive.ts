import { Directive, Input } from '@angular/core';
import { AbstractControl,  NG_VALIDATORS,  ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMultiValidator]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: MultiValidatorDirective, multi: true }]
})
export class MultiValidatorDirective implements Validator{

  @Input() validateOption!: string;
  
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    switch(this.validateOption) {
      case 'domain':
        return this.domainValidator(control);
    }
    return null;
  }

  private domainValidator(control: AbstractControl): ValidationErrors | null {
    const regex = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))+$/;
    return regex.test(control.value) ? null : { domain: 'must be a valid domain' };
  }

}
