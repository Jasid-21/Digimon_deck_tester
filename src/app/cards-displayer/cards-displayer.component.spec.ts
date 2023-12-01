import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDisplayerComponent } from './cards-displayer.component';

describe('CardsDisplayerComponent', () => {
  let component: CardsDisplayerComponent;
  let fixture: ComponentFixture<CardsDisplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsDisplayerComponent]
    });
    fixture = TestBed.createComponent(CardsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
