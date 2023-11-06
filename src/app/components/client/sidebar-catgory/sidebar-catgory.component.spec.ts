import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCatgoryComponent } from './sidebar-catgory.component';

describe('SidebarCatgoryComponent', () => {
  let component: SidebarCatgoryComponent;
  let fixture: ComponentFixture<SidebarCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCatgoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
