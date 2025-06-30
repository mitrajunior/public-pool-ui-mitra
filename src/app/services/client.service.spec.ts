import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { environment } from '../../environments/environment';

describe('ClientService', () => {
  let service: ClientService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });
    service = TestBed.inject(ClientService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should request client info', () => {
    service.getClientInfo('abc').subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/client/abc`);
    expect(req.request.method).toBe('GET');
  });
});
