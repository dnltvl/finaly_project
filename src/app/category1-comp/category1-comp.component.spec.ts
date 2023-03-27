import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category1CompComponent } from './category1-comp.component';

describe('Category1CompComponent', () => {
  let component: Category1CompComponent;
  let fixture: ComponentFixture<Category1CompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Category1CompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Category1CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
