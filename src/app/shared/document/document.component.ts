import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  @Input() documentUrl: string | undefined
  @Input() documentName: String = ''
}
