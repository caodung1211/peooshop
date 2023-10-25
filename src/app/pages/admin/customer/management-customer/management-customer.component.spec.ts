import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerComponent } from './management-customer.component';

describe('ManagementCustomerComponent', () => {
  let component: ManagementCustomerComponent;
  let fixture: ComponentFixture<ManagementCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
