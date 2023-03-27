import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseregFormComponent } from './usereg-form.component';

describe('UseregFormComponent', () => {
  let component: UseregFormComponent;
  let fixture: ComponentFixture<UseregFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseregFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseregFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
