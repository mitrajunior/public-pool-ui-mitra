import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public stateOptions: any[] = [{ label: 'On', value: true }, { label: 'Off', value: false },];

  public value: boolean = true;
  public stratumHost = '';
  public stratumPort = '';

  constructor(private localStorageService: LocalStorageService) {
    this.value = this.localStorageService.getParticles();
    const stored = this.localStorageService.getStratumURL();
    const fallback = stored || environment.STRATUM_URL || `${window.location.hostname}:3333`;
    const [host, port] = fallback.split(':');
    this.stratumHost = host;
    this.stratumPort = port || '';
  }

  public particlesChanged(newVal: boolean) {
    this.localStorageService.setParticles(newVal);
    this.value = newVal;
  }

  public saveStratum() {
    const url = `${this.stratumHost}:${this.stratumPort}`;
    this.localStorageService.setStratumURL(url);
  }
}
