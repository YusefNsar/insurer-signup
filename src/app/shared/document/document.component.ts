import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
})
export class DocumentComponent {
  @Input() documentFile: File | undefined
  @Input() documentName: String = ''

  downloadFile() {
    console.log('download docs')
  }
}
