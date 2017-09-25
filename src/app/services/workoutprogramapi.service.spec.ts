/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkoutprogramapiService } from './workoutprogramapi.service';

describe('Service: Workoutprogramapi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutprogramapiService]
    });
  });

  it('should ...', inject([WorkoutprogramapiService], (service: WorkoutprogramapiService) => {
    expect(service).toBeTruthy();
  }));
});