import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productdescription1Component } from './productdescription1.component';

describe('Productdescription1Component', () => {
  let component: Productdescription1Component;
  let fixture: ComponentFixture<Productdescription1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Productdescription1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Productdescription1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
