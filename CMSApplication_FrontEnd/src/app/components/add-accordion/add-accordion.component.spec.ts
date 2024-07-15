import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccordionComponent } from './add-accordion.component';

describe('AddAccordionComponent', () => {
  let component: AddAccordionComponent;
  let fixture: ComponentFixture<AddAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
