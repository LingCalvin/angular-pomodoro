import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyLicensesComponent } from './third-party-licenses.component';

describe('ThirdPartyLicensesComponent', () => {
  let component: ThirdPartyLicensesComponent;
  let fixture: ComponentFixture<ThirdPartyLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
