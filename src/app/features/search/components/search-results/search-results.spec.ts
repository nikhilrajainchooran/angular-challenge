import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchResults } from './search-results';
import {
  mockAircraftResult,
  mockCallsignResult,
  mockErrorResult,
} from '../../../../core/shared/utils/test-utils';

describe('SearchResults', () => {
  let component: SearchResults;
  let fixture: ComponentFixture<SearchResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResults],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResults);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map aircraft results correctly', () => {
    fixture.componentRef.setInput('searchType', 'aircraft');
    fixture.componentRef.setInput('searchResults', [mockAircraftResult]);
    fixture.detectChanges();

    const data = component.aircraftDisplayData();
    expect(data).toEqual([
      jasmine.objectContaining({
        registration: 'N123AB',
        image: 'https://example.com/thumb.jpg',
      }),
    ]);
  });

  it('should map callsign results correctly', () => {
    fixture.componentRef.setInput('searchType', 'callsign');
    fixture.componentRef.setInput('searchResults', [mockCallsignResult]);
    fixture.detectChanges();

    const data = component.callsignDisplayData();
    expect(data).toEqual([
      jasmine.objectContaining({
        callsign: 'DLH400',
        airline: 'Lufthansa',
      }),
    ]);
  });

  it('should handle errors by emitting failedErrors and marking all failed', fakeAsync(() => {
    const emitted: string[][] = [];
    component.failedErrors.subscribe((errs) => emitted.push(errs));

    fixture.componentRef.setInput('searchType', 'aircraft');
    fixture.componentRef.setInput('searchResults', [mockErrorResult]);
    fixture.detectChanges();
    tick(); // flush setTimeout

    expect(emitted[0][0]).toContain('not found');
    expect(component.allResultsFailed()).toBeTrue();
  }));
});
