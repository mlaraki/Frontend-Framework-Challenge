import { TestBed } from '@angular/core/testing';

import { GetImagesService } from './get-images.service';

describe('GetImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetImagesService = TestBed.get(GetImagesService);
    expect(service).toBeTruthy();
  });
});
