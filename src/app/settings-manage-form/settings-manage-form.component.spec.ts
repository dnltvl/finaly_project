import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsManageFormComponent } from './settings-manage-form.component';

describe('SettingsManageFormComponent', () => {
  let component: SettingsManageFormComponent;
  let fixture: ComponentFixture<SettingsManageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsManageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
