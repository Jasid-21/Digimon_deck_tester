import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HatchComponent } from './hatch.component';

describe('HatchComponent', () => {
  let component: HatchComponent;
  let fixture: ComponentFixture<HatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HatchComponent]
    });
    fixture = TestBed.createComponent(HatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
