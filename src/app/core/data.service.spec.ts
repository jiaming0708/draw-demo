import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should be get matrix data', inject([DataService], (service: DataService) => {
    service.getMatrix()
      .subscribe(p => expect(p).toBeTruthy());
  }));

  it('should be get history data', inject([DataService], (service: DataService) => {
    service.getHistory()
      .subscribe(p => expect(p).toBeTruthy());
  }));
});
