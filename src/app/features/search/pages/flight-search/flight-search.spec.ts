import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { AviationDataService } from '../../../../core/services/aviation-data';
import { FlightSearch } from './flight-search';
import { mockAircraftResult } from '../../../../core/shared/utils/test-utils';

describe('FlightSearch', () => {
  let component: FlightSearch;
  let fixture: ComponentFixture<FlightSearch>;
  let aviationService: jasmine.SpyObj<AviationDataService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    aviationService = jasmine.createSpyObj('AviationDataService', ['fetchMultipleRecords']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [FlightSearch],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: AviationDataService, useValue: aviationService },
        { provide: MatSnackBar, useValue: snackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearch);
    component = fixture.componentInstance;
  });

  it('should start with default state', () => {
    expect(component.hasSearched()).toBeFalse();
    expect(component.isLoading()).toBeFalse();
    expect(component.searchResults()).toEqual([]);
  });

  it('should update state on successful search', () => {
    aviationService.fetchMultipleRecords.and.returnValue(of([mockAircraftResult]));

    component.handleSearch({ type: 'aircraft', values: ['N123AB'] });

    expect(component.searchResults()).toEqual([mockAircraftResult]);
    expect(component.hasSearched()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  });

  it('should show error and clear results on failed search', () => {
    aviationService.fetchMultipleRecords.and.returnValue(throwError(() => new Error('Test error')));

    component.handleSearch({ type: 'aircraft', values: ['N123AB'] });

    expect(snackBar.open).toHaveBeenCalled();
    expect(component.searchResults()).toEqual([]);
    expect(component.isLoading()).toBeFalse();
  });

  it('should call snackbar only when errors exist', () => {
    component.handleFailedResults([]);
    expect(snackBar.open).not.toHaveBeenCalled();

    component.handleFailedResults(['Something went wrong']);
    expect(snackBar.open).toHaveBeenCalled();
  });
});
