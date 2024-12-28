import { TestBed } from '@angular/core/testing';

import { PatientGrpcService } from './patient-grpc.service';

describe('PatientGrpcService', () => {
  let service: PatientGrpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientGrpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
