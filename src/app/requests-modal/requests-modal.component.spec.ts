import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsModalComponent } from './requests-modal.component';

describe('RequestsModalComponent', () => {
  let component: RequestsModalComponent;
  let fixture: ComponentFixture<RequestsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsModalComponent]
    });
    fixture = TestBed.createComponent(RequestsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
