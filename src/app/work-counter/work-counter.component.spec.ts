import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCounterComponent } from './work-counter.component';

describe('WorkCounterComponent', () => {
  let component: WorkCounterComponent;
  let fixture: ComponentFixture<WorkCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
