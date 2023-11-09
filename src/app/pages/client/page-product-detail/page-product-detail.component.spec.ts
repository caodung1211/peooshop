import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProductDetailComponent } from './page-product-detail.component';

describe('PageProductDetailComponent', () => {
  let component: PageProductDetailComponent;
  let fixture: ComponentFixture<PageProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProductDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
