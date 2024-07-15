import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLayout3Component } from './homepage-layout3.component';

describe('HomepageLayout3Component', () => {
  let component: HomepageLayout3Component;
  let fixture: ComponentFixture<HomepageLayout3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageLayout3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageLayout3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
