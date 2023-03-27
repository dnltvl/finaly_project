import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product1CompComponent } from './product1-comp.component';

describe('Product1CompComponent', () => {
  let component: Product1CompComponent;
  let fixture: ComponentFixture<Product1CompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Product1CompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Product1CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
