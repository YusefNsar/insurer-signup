import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../../shared/layout/layout.component';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent {

  constructor(private sharedService: SharedService , private router: Router , private layoutComponent: LayoutComponent) {
    this.layoutComponent.showBackgroundEffects = false;
  }

  acceptTerms(): void {
    this.sharedService.setAgreeState(true);
    this.router.navigate(['/insurer/signup']);
  }
  declineTerms(): void {
    this.sharedService.setAgreeState(false);
    this.router.navigate(['/insurer/signup']);
  }

}
