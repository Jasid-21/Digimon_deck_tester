import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResultItemComponent } from './card-result-item.component';

describe('CardResultItemComponent', () => {
  let component: CardResultItemComponent;
  let fixture: ComponentFixture<CardResultItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardResultItemComponent]
    });
    fixture = TestBed.createComponent(CardResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
