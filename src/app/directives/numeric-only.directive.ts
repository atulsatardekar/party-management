import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[inputRestriction]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputRestrictionDirective,
      multi: true
    }
  ]
})
export class InputRestrictionDirective implements Validator {
  @Input('inputRestriction') restrictionType!: string;

  private keyPatterns: { [key: string]: RegExp } = {
    numeric: /[0-9]/,
    alpha: /[A-Z]/,
    alphanumeric: /[A-Z0-9]/,
    gstin: /[A-Z0-9]/,
    pan: /[A-Z0-9]/,
    ifsc: /[A-Z0-9]/,
    account: /[0-9]/
  };

  private strictPatterns: { [key: string]: RegExp } = {
    gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    account: /^[0-9]{9,18}$/
  };

  validate(control: AbstractControl): ValidationErrors | null {
    const value = typeof control.value==='string'? control.value.toUpperCase() : '';

    const strictPattern = this.strictPatterns[this.restrictionType];
    if (strictPattern && value && !strictPattern.test(value)) {
      return { invalidFormat: true };
    }
    return null;
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode).toUpperCase();
    const pattern = this.keyPatterns[this.restrictionType];
    if (pattern && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    switch (this.restrictionType) {
      case 'gstin':
        input.value = input.value.toUpperCase().slice(0, 15);
        break;
      case 'pan':
        input.value = input.value.toUpperCase().slice(0, 10);
        break;
      case 'ifsc':
        input.value = input.value.toUpperCase().slice(0, 11);
        break;
      case 'account':
        input.value = input.value.slice(0, 18);
        break;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text')?.toUpperCase() ?? '';
    const pattern = this.keyPatterns[this.restrictionType];
    if (pattern && !pattern.test(pastedText)) {
      event.preventDefault();
    }
  }
}
