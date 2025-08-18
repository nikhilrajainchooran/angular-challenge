import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { AviationDataService } from '../../../../core/services/aviation-data';
import { FlightSearch } from './flight-search';
import { mockAircraftResult } from '../../../../core/shared/utils/test-utils';

describe('SearchPage', () => {
  let component: FlightSearch;
  let fixture: ComponentFixture<FlightSearch>;
  let aviationService: jasmine.SpyObj<AviationDataService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const aviationSpy = jasmine.createSpyObj('AviationDataService', ['fetchMultipleRecords']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [FlightSearch],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: AviationDataService, useValue: aviationSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearch);
    component = fixture.componentInstance;
    aviationService = TestBed.inject(AviationDataService) as jasmine.SpyObj<AviationDataService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should initialize with default state', () => {
    expect(component.hasSearched()).toBeFalse();
    expect(component.isLoading()).toBeFalse();
    expect(component.searchResults()).toEqual([]);
  });

  it('should handle successful aircraft search', () => {
    aviationService.fetchMultipleRecords.and.returnValue(of([mockAircraftResult]));

    component.handleSearch({ type: 'aircraft', values: ['N123AB'] });

    expect(component.searchResults()).toEqual([mockAircraftResult]);
    expect(component.hasSearched()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle search error', () => {
    aviationService.fetchMultipleRecords.and.returnValue(throwError(() => new Error('Test error')));

    component.handleSearch({ type: 'aircraft', values: ['N123AB'] });

    expect(snackBar.open).toHaveBeenCalled();
    expect(component.searchResults()).toEqual([]);
    expect(component.isLoading()).toBeFalse();
  });

  it('should display results when available', () => {
    component.hasSearched.set(true);
    component.searchResults.set([mockAircraftResult]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-search-results')).toBeTruthy();
  });
});
