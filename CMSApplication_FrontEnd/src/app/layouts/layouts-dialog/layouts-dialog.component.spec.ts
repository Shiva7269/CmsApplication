import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsDialogComponent } from './layouts-dialog.component';

describe('LayoutsDialogComponent', () => {
  let component: LayoutsDialogComponent;
  let fixture: ComponentFixture<LayoutsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
