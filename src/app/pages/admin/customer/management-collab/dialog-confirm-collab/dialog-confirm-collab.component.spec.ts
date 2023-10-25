import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmCollabComponent } from './dialog-confirm-collab.component';

describe('DialogConfirmCollabComponent', () => {
  let component: DialogConfirmCollabComponent;
  let fixture: ComponentFixture<DialogConfirmCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
