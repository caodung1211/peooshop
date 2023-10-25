import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCollabComponent } from './add-or-edit-collab.component';

describe('AddOrEditCollabComponent', () => {
  let component: AddOrEditCollabComponent;
  let fixture: ComponentFixture<AddOrEditCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
