import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formData!: FormGroup;

  constructor() { }

  setFormData(formData: FormGroup) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }
}
