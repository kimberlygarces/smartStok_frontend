import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsRegisterComponent } from './alerts-register.component';

describe('AlertsRegisterComponent', () => {
  let component: AlertsRegisterComponent;
  let fixture: ComponentFixture<AlertsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
