import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { AppService } from '../../services/app.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { address: 'a' } } } },
        { provide: ClientService, useValue: { getClientInfo: () => of({ workers: [] }), getClientInfoChart: () => of([]) } },
        { provide: AppService, useValue: { getNetworkInfo: () => of({ difficulty: 1 }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load client data', (done) => {
    component.clientInfo$.subscribe(info => {
      expect(info.workers).toEqual([]);
      done();
    });
  });
});
