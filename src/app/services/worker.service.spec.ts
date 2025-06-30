import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkerService } from './worker.service';
import { environment } from '../../environments/environment';

describe('WorkerService', () => {
  let service: WorkerService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkerService]
    });
    service = TestBed.inject(WorkerService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should request group worker info', () => {
    service.getGroupWorkerInfo('a', 'b').subscribe();
    const req = http.expectOne(`${environment.API_URL}/api/client/a/b`);
    expect(req.request.method).toBe('GET');
  });
});
