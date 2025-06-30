import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and load stratum url', () => {
    service.setStratumURL('mine.example.com:1234');
    expect(localStorage.setItem).toHaveBeenCalledWith('STRATUM_URL', 'mine.example.com:1234');

    (localStorage.getItem as jasmine.Spy).and.returnValue('mine.example.com:1234');
    expect(service.getStratumURL()).toBe('mine.example.com:1234');
  });
});
