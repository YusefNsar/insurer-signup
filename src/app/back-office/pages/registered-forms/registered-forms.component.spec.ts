import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RegisteredFormsComponent } from './registered-forms.component'

describe('RegisteredFormsComponent', () => {
  let component: RegisteredFormsComponent
  let fixture: ComponentFixture<RegisteredFormsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredFormsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RegisteredFormsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
