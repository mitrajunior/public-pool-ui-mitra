import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should login and store token', () => {
    service.login('a', 'b').subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 't' });
    expect(service.token).toBe('t');
  });
});
