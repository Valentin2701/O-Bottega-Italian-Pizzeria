import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const rePass = group.get('rePass')?.value;

  return password === rePass ? null : { passwordMissmatch: true };
};