import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ApiService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, MatSnackBar, Overlay],
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
