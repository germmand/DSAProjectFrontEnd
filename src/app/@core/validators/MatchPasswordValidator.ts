import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MatchPasswordValidator(passwordField, confirmPasswordField): ValidatorFn {
  return (formGroup: AbstractControl): {[key: string]: any} | null => {
    const password = formGroup.value[passwordField];
    const repeatedPassword = formGroup.value[confirmPasswordField];

    return password !== repeatedPassword
      ? { matchpassword: true }
      : null;
  };
}
