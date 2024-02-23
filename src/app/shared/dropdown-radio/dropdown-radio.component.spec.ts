import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownRadioComponent } from './dropdown-radio.component';

describe('DropdownRadioComponent', () => {
  let component: DropdownRadioComponent;
  let fixture: ComponentFixture<DropdownRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownRadioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
