import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listofproduct2Component } from './listofproduct2.component';

describe('Listofproduct2Component', () => {
  let component: Listofproduct2Component;
  let fixture: ComponentFixture<Listofproduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listofproduct2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Listofproduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
