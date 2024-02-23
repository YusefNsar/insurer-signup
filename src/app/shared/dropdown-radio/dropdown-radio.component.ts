import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core'

@Component({
  selector: 'app-dropdown-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-radio.component.html',
  styleUrl: './dropdown-radio.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DropdownRadioComponent {
  @Input({ required: true }) options!: string[]
  @Output() optionSelected = new EventEmitter<string | null>()

  selectedOption: string | null = null

  selectOption(option: string | null) {
    this.selectedOption = option
    this.optionSelected.emit(option)
  }
}
