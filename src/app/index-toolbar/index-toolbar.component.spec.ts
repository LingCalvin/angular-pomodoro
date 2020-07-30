import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexToolbarComponent } from './index-toolbar.component';

describe('IndexToolbarComponent', () => {
  let component: IndexToolbarComponent;
  let fixture: ComponentFixture<IndexToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
