import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkerComponent } from './worker.component';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../services/worker.service';
import { of } from 'rxjs';
import { AppService } from '../../services/app.service';

describe('WorkerComponent', () => {
  let component: WorkerComponent;
  let fixture: ComponentFixture<WorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { address: 'a', workerName: 'b', workerId: '1' } } } },
        { provide: WorkerService, useValue: { getWorkerInfo: () => of({ chartData: [] }) } },
        { provide: AppService, useValue: { getNetworkInfo: () => of({ difficulty: 1 }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load worker data', (done) => {
    component.workerInfo$.subscribe(info => {
      expect(info.chartData).toEqual([]);
      done();
    });
  });
});
