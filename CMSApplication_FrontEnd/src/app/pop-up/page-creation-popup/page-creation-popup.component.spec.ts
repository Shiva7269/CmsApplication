import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationPopupComponent } from './page-creation-popup.component';

describe('PageCreationPopupComponent', () => {
  let component: PageCreationPopupComponent;
  let fixture: ComponentFixture<PageCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCreationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
