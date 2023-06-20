import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostModalComponent } from './host-modal.component';

describe('HostModalComponent', () => {
  let component: HostModalComponent;
  let fixture: ComponentFixture<HostModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostModalComponent]
    });
    fixture = TestBed.createComponent(HostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
