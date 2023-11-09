import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLocalBrandComponent } from './page-local-brand.component';

describe('PageLocalBrandComponent', () => {
  let component: PageLocalBrandComponent;
  let fixture: ComponentFixture<PageLocalBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLocalBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLocalBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
