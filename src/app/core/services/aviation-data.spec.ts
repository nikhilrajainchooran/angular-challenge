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

  it('should fetch aircraft and callsign data', () => {
    const aircraftResponse = { response: { aircraft: { registration: 'N123AB' } } };
    const callsignResponse = { response: { flightroute: { callsign: 'DLH400' } } };

    service
      .fetchAircraftByRegistration('N123AB')
      .subscribe((res) => expect(res).toEqual(aircraftResponse as any));
    httpMock.expectOne(`${baseUrl}/aircraft/N123AB`).flush(aircraftResponse);

    service
      .fetchByCallsign('DLH400')
      .subscribe((res) => expect(res).toEqual(callsignResponse as any));
    httpMock.expectOne(`${baseUrl}/callsign/DLH400`).flush(callsignResponse);
  });

  it('should return proper error on 404', () => {
    service.fetchAircraftByRegistration('INVALID').subscribe((res) => {
      expect('error' in res).toBeTrue();
      expect((res as any).error.message).toBe('The requested data was not found.');
    });

    httpMock
      .expectOne(`${baseUrl}/aircraft/INVALID`)
      .flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should return network error when status is 0', () => {
    service.fetchAircraftByRegistration('NETWORKFAIL').subscribe((res) => {
      expect((res as any).error.message).toBe('Network error. Please check your connection.');
      expect((res as any).error.status).toBe(0);
    });

    httpMock
      .expectOne(`${baseUrl}/aircraft/NETWORKFAIL`)
      .flush({}, { status: 0, statusText: 'Unknown Error' });
  });

  it('should fetch multiple records with mixed success and error', () => {
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
});
