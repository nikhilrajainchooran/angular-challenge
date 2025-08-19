import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, of } from 'rxjs';
import {
  AircraftResponse,
  CallsignResponse,
  ErrorResult,
  SearchResult,
} from '../models/api-response.model';
import { SearchType } from '../types/search.types';

@Injectable({
  providedIn: 'root',
})
export class AviationDataService {
  private apiBaseUrl = 'https://api.adsbdb.com/v0';
  private http = inject(HttpClient);

  fetchAircraftByRegistration(
    registrationNumber: string,
  ): Observable<AircraftResponse | ErrorResult> {
    return this.http
      .get<AircraftResponse>(`${this.apiBaseUrl}/aircraft/${registrationNumber}`)
      .pipe(
        catchError((error) =>
          of({
            error: {
              message: this.extractErrorMessage(error),
              status: error.status,
            },
          } as ErrorResult),
        ),
      );
  }

  fetchByCallsign(callsign: string): Observable<CallsignResponse | ErrorResult> {
    return this.http.get<CallsignResponse>(`${this.apiBaseUrl}/callsign/${callsign}`).pipe(
      catchError((error) =>
        of({
          error: {
            message: this.extractErrorMessage(error),
            status: error.status,
          },
        } as ErrorResult),
      ),
    );
  }

  fetchMultipleRecords(type: SearchType, searchValues: string[]): Observable<SearchResult[]> {
    const searchRequests = searchValues.map((value) =>
      type === 'aircraft'
        ? this.fetchAircraftByRegistration(value.trim())
        : this.fetchByCallsign(value.trim()),
    );
    return forkJoin(searchRequests);
  }

  private extractErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'The requested data was not found.';
    } else {
      return error.error?.message || 'An unexpected error occurred.';
    }
  }
}
