import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import { ISettings } from '../interfaces/settings.interface';

@Component({
  selector: 'app-settings-manage-form',
  templateUrl: './settings-manage-form.component.html',
  styleUrls: ['./settings-manage-form.component.css']
})
export class SettingsManageFormComponent implements OnInit {

  settingsForm: FormGroup = new FormGroup({
    vatRate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1)]),
    discountThreshold: new FormControl(0, [Validators.required, Validators.min(0)]),
    discountRate: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(1)]),
  });

  saveSuccess: boolean = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    const current = this.settingsService.getCurrentSettings();
    this.settingsForm.patchValue(current);
  }

  save() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const updatedSettings: ISettings = this.settingsForm.value;

    this.settingsService.updateSettings(updatedSettings).subscribe(() => {
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
    });
  }
}