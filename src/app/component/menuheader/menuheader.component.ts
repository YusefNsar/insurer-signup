import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-menuheader',
  standalone: true,
  imports: [RouterLink,MaterialModule], // importing routerlink to navigate through pages
  templateUrl: './menuheader.component.html',
  styleUrl: './menuheader.component.css'
})
export class MenuheaderComponent {
  constructor() {}
}
