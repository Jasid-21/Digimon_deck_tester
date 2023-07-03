import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSideComponent } from './field-side.component';

describe('FieldSideComponent', () => {
  let component: FieldSideComponent;
  let fixture: ComponentFixture<FieldSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldSideComponent]
    });
    fixture = TestBed.createComponent(FieldSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
