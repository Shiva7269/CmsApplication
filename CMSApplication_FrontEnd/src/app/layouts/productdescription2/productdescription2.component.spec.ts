import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productdescription2Component } from './productdescription2.component';

describe('Productdescription2Component', () => {
  let component: Productdescription2Component;
  let fixture: ComponentFixture<Productdescription2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Productdescription2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Productdescription2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
