import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetCounterConfirmDialogComponent } from './reset-counter-confirm-dialog.component';

describe('ResetCounterConfirmDialogComponent', () => {
  let component: ResetCounterConfirmDialogComponent;
  let fixture: ComponentFixture<ResetCounterConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetCounterConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetCounterConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
