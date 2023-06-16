import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawCardComponent } from './raw-card.component';

describe('RawCardComponent', () => {
  let component: RawCardComponent;
  let fixture: ComponentFixture<RawCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RawCardComponent]
    });
    fixture = TestBed.createComponent(RawCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
