import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigIaComponent } from './config-ia.component';

describe('ConfigIaComponent', () => {
  let component: ConfigIaComponent;
  let fixture: ComponentFixture<ConfigIaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigIaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigIaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
