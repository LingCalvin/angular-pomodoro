import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDialogueComponent } from './about-dialogue.component';

describe('AboutDialogueComponent', () => {
  let component: AboutDialogueComponent;
  let fixture: ComponentFixture<AboutDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
