import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNameConfigComponent } from './table-name-config.component';

describe('TableNameConfigComponent', () => {
  let component: TableNameConfigComponent;
  let fixture: ComponentFixture<TableNameConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNameConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
