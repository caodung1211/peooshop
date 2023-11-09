import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockProductClientComponent } from './block-product-client.component';

describe('BlockProductClientComponent', () => {
  let component: BlockProductClientComponent;
  let fixture: ComponentFixture<BlockProductClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockProductClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockProductClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
