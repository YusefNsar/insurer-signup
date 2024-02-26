import { Component,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showBackgroundEffects:boolean=true;
  constructor(
    
    private appComponent: AppComponent
  ) {
    this.showBackgroundEffects=this.appComponent.showBackgroundEffects=true;}
}
