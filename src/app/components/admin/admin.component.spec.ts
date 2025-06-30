import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminComponent } from './admin.component';
import { AuthService } from '../../services/auth.service';
import { PoolSettingsService } from '../../services/pool-settings.service';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: { isAuthenticated: () => true, login: () => of({}), token: null } },
        { provide: PoolSettingsService, useValue: { getSettings: () => of({ feePercent: 0 }), updateSettings: () => of({}) } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
