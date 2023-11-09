import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCollabComponent } from './page-collab.component';

describe('PageCollabComponent', () => {
  let component: PageCollabComponent;
  let fixture: ComponentFixture<PageCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
