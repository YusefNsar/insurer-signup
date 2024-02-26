import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formData: { [key: string]: FormGroup } = {};
  fileData: { [key: string]: any[] } = {}; // Added fileData property

  constructor() { }

  setFormData(key: string, formData: FormGroup) {
    this.formData[key] = formData;
  }

  getFormData(key: string) {
    return this.formData[key];
  }

  // New function to persist file data
  setFileData(key: string, files: any[]) {
    this.fileData[key] = files;
  }

  // New function to retrieve file data
  getFileData(key: string) {
    return this.fileData[key];
  }
}
