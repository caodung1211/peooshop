import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSizeComponent } from './management-size.component';

describe('ManagementSizeComponent', () => {
  let component: ManagementSizeComponent;
  let fixture: ComponentFixture<ManagementSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
