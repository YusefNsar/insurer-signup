// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private agreeSubject = new BehaviorSubject<boolean>(false);
  agreeChanged$: Observable<boolean> = this.agreeSubject.asObservable();

  setAgreeState(state: boolean): void {
    this.agreeSubject.next(state);
  }
}
