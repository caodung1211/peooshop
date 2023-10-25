import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCollabComponent } from './management-collab.component';

describe('ManagementCollabComponent', () => {
  let component: ManagementCollabComponent;
  let fixture: ComponentFixture<ManagementCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
