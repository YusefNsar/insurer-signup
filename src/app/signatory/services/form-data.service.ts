import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formData: { [key: string]: FormGroup } = {};

  constructor() { }

  setFormData(key: string, formData: FormGroup) {
    this.formData[key] = formData;
  }

  getFormData(key: string) {
    return this.formData[key];
  }
}
