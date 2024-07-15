import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLayout2Component } from './homepage-layout2.component';

describe('HomepageLayout2Component', () => {
  let component: HomepageLayout2Component;
  let fixture: ComponentFixture<HomepageLayout2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageLayout2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomepageLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
