import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCollectionComponent } from './page-collection.component';

describe('PageCollectionComponent', () => {
  let component: PageCollectionComponent;
  let fixture: ComponentFixture<PageCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
