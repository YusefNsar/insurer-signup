import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormDataService } from '../services/form-data.service';

@Injectable({
  providedIn: 'root'
})
export class FormsResolver implements Resolve<FormGroup> {

  constructor(private formDataService: FormDataService) { }

  resolve(): Observable<FormGroup> {
    return of(this.formDataService.getFormData());
  }
}
