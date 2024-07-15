import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLayout1Component } from './homepage-layout1.component';

describe('HomepageLayout1Component', () => {
  let component: HomepageLayout1Component;
  let fixture: ComponentFixture<HomepageLayout1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageLayout1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageLayout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
