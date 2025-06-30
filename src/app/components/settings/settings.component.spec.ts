import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { LocalStorageService } from '../../services/local-storage.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let local: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['getParticles', 'setParticles', 'getStratumURL', 'setStratumURL']);
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [{ provide: LocalStorageService, useValue: spy }]
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    local = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stored stratum settings', () => {
    local.getParticles.and.returnValue(true);
    local.getStratumURL.and.returnValue('pool.test:9999');
    fixture.detectChanges();
    expect(component.stratumHost).toBe('pool.test');
    expect(component.stratumPort).toBe('9999');
  });

  it('should save stratum settings', () => {
    fixture.detectChanges();
    component.stratumHost = 'host';
    component.stratumPort = '3333';
    component.saveStratum();
    expect(local.setStratumURL).toHaveBeenCalledWith('host:3333');
  });
});
