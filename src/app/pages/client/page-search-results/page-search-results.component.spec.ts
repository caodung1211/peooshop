import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSearchResultsComponent } from './page-search-results.component';

describe('PageSearchResultsComponent', () => {
  let component: PageSearchResultsComponent;
  let fixture: ComponentFixture<PageSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
