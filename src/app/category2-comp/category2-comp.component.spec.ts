import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category2CompComponent } from './category2-comp.component';

describe('Category2CompComponent', () => {
  let component: Category2CompComponent;
  let fixture: ComponentFixture<Category2CompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Category2CompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Category2CompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
