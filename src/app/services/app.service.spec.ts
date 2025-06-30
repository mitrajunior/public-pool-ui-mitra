import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { environment } from '../../environments/environment';

describe('AppService', () => {
  let service: AppService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    service = TestBed.inject(AppService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getInfo should call backend', () => {
    service.getInfo().subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/info`);
    expect(req.request.method).toBe('GET');
  });

  it('getNetworkInfo should call backend', () => {
    service.getNetworkInfo().subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/network`);
    expect(req.request.method).toBe('GET');
  });
});
