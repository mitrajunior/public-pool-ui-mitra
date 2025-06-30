import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PoolSettingsService } from '../../services/pool-settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username = '';
  password = '';

  settings: any = null;
  feeAddress = '';
  feePercent = 0;

  constructor(public auth: AuthService, private poolSettings: PoolSettingsService) {}

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.load();
    }
  }

  login() {
    this.auth.login(this.username, this.password).subscribe(() => this.load());
  }

  load() {
    this.poolSettings.getSettings().subscribe(s => {
      this.settings = s;
      this.feeAddress = s.feeAddress;
      this.feePercent = s.feePercent;
    });
  }

  save() {
    this.poolSettings.updateSettings({ feeAddress: this.feeAddress, feePercent: this.feePercent }).subscribe(res => {
      this.settings = res;
    });
  }
}
