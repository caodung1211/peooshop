import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBaseLayoutComponent } from './table-base-layout.component';

describe('TableBaseLayoutComponent', () => {
  let component: TableBaseLayoutComponent;
  let fixture: ComponentFixture<TableBaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBaseLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
