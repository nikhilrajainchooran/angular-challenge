import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    expect(data.length).toBe(1);
    expect(data[0].registration).toBe('N123AB');
    expect(data[0].image).toBe('https://example.com/thumb.jpg');
  });

  it('should map callsign results correctly', () => {
    fixture.componentRef.setInput('searchType', 'callsign');
    fixture.componentRef.setInput('searchResults', [mockCallsignResult]);
    fixture.detectChanges();

    const data = component.callsignDisplayData();
    expect(data.length).toBe(1);
    expect(data[0].callsign).toBe('DLH400');
    expect(data[0].airline).toBe('Lufthansa');
  });

  it('should handle errors and mark failed results', () => {
    fixture.componentRef.setInput('searchResults', [mockErrorResult]);
    fixture.detectChanges();

    expect(component.aircraftDisplayData().length).toBe(0);
    expect(component.callsignDisplayData().length).toBe(0);
    expect(component.allResultsFailed()).toBeTrue();
  });
});
