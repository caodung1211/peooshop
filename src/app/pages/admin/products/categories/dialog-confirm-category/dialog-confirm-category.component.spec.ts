import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmCategoryComponent } from './dialog-confirm-category.component';

describe('DialogConfirmCategoryComponent', () => {
  let component: DialogConfirmCategoryComponent;
  let fixture: ComponentFixture<DialogConfirmCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
