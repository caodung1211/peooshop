import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmProductComponent } from './dialog-confirm-product.component';

describe('DialogConfirmProductComponent', () => {
  let component: DialogConfirmProductComponent;
  let fixture: ComponentFixture<DialogConfirmProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
