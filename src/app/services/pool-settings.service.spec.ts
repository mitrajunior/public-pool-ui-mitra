import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PoolSettingsService } from './pool-settings.service';
import { environment } from '../../environments/environment';

describe('PoolSettingsService', () => {
  let service: PoolSettingsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PoolSettingsService]
    });
    service = TestBed.inject(PoolSettingsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should fetch settings', () => {
    service.getSettings().subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/settings`);
    expect(req.request.method).toBe('GET');
  });

  it('should update settings', () => {
    service.updateSettings({ feePercent: 1 }).subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/settings`);
    expect(req.request.method).toBe('PUT');
  });
});
