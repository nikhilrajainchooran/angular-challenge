import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AviationDataService } from './aviation-data';

describe('AviationDataService', () => {
  let service: AviationDataService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://api.adsbdb.com/v0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AviationDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch aircraft data', () => {
    const mockResponse = { response: { aircraft: { registration: 'N123AB' } } };

    service.fetchAircraftByRegistration('N123AB').subscribe((result) => {
      expect(result).toEqual(mockResponse as any);
    });

    httpMock.expectOne(`${baseUrl}/aircraft/N123AB`).flush(mockResponse);
  });

  it('should fetch callsign data', () => {
    const mockResponse = {
      response: { flightroute: { callsign: 'DLH400', airline: { name: 'LH' } } },
    };

    service.fetchByCallsign('DLH400').subscribe((result) => {
      expect(result).toEqual(mockResponse as any);
    });

    httpMock.expectOne(`${baseUrl}/callsign/DLH400`).flush(mockResponse);
  });

  it('should return error result on failed request', () => {
    service.fetchAircraftByRegistration('INVALID').subscribe((result) => {
      expect('error' in result).toBeTrue();
      expect((result as any).error.message).toContain('not found');
    });

    httpMock
      .expectOne(`${baseUrl}/aircraft/INVALID`)
      .flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should fetch multiple records and handle mixed results', () => {
    const goodResponse = { response: { aircraft: { registration: 'N123AB' } } };

    service.fetchMultipleRecords('aircraft', ['N123AB', 'INVALID']).subscribe((results) => {
      expect(results.length).toBe(2);
      expect('response' in results[0]).toBeTrue();
      expect('error' in results[1]).toBeTrue();
    });

    httpMock.expectOne(`${baseUrl}/aircraft/N123AB`).flush(goodResponse);
    httpMock
      .expectOne(`${baseUrl}/aircraft/INVALID`)
      .flush({}, { status: 404, statusText: 'Not Found' });
  });

  describe('Error Handling', () => {
    it('should use custom error messages when available', () => {
      service.fetchByCallsign('TEST').subscribe((result) => {
        expect((result as any).error.message).toBe('Custom message');
      });

      httpMock
        .expectOne(`${baseUrl}/callsign/TEST`)
        .flush({ message: 'Custom message' }, { status: 500 });
    });

    it('should fall back to default message when no custom message exists', () => {
      service.fetchByCallsign('TEST').subscribe((result) => {
        expect((result as any).error.message).toBe('An unexpected error occurred.');
      });

      httpMock.expectOne(`${baseUrl}/callsign/TEST`).flush({}, { status: 500 });
    });
  });
});
