import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  // ✅ Only numbers allowed
  static numericOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && !/^[0-9]*$/.test(value)) {
        return { numericOnly: true };
      }
      return null;
    };
  }

  // ✅ Exactly 10 digits (useful for mobile numbers)
  static mobileNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && !/^[0-9]{10}$/.test(value)) {
        return { mobileNumber: true };
      }
      return null;
    };
  }
}
