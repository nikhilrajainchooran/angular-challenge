import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import {
  AircraftResponse,
  CallsignResponse,
  ErrorResult,
  SearchResult,
} from '../../../../core/models/api-response.model';
import { SearchType } from '../../../../core/types/search.types';
import { SEARCH_MATERIAL_MODULES } from '../../../../shared/modules/material.modules';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-results',
  imports: [CommonModule, ...SEARCH_MATERIAL_MODULES, MatTableModule],
  styleUrl: './search-results.scss',
  templateUrl: './search-results.html',
})
export class SearchResults {
  searchResults = input<SearchResult[]>([]);
  searchType = input.required<SearchType>();
  failedErrors = output<string[]>();

  /** aircraft rows mapped for table */
  aircraftDisplayData = computed(() => {
    const errors: string[] = [];
    const data: AircraftResponse[] = this.searchResults().filter(
      (item): item is AircraftResponse => {
        if ('error' in item) {
          errors.push((item as ErrorResult).error?.message || 'Unknown error');
          return false;
        }
        return 'response' in item && 'aircraft' in item.response;
      },
    );

    if (errors.length) setTimeout(() => this.failedErrors.emit(errors));

    return data.map((item) => {
      const aircraft = item.response.aircraft;
      return {
        ...aircraft,
        image: aircraft.url_photo_thumbnail || 'assets/placeholder.png',
      };
    });
  });

  /** callsign rows mapped for table */
  callsignDisplayData = computed(() => {
    const errors: string[] = [];
    const data: CallsignResponse[] = this.searchResults().filter(
      (item): item is CallsignResponse => {
        if ('error' in item) {
          errors.push((item as ErrorResult).error?.message || 'Unknown error');
          return false;
        }
        return 'response' in item && 'flightroute' in item.response;
      },
    );

    if (errors.length) setTimeout(() => this.failedErrors.emit(errors));

    return data.map((item) => {
      const callsign = item.response.flightroute;
      return {
        airline: callsign.airline?.name || 'N/A',
        callsign: callsign.callsign,
        origin: callsign.origin?.name || 'N/A',
        destination: callsign.destination?.name || 'N/A',
      };
    });
  });

  allResultsFailed = computed(() => {
    return (
      this.searchResults().length > 0 &&
      this.aircraftDisplayData().length === 0 &&
      this.callsignDisplayData().length === 0
    );
  });

  aircraftColumns = [
    'image',
    'registration',
    'type',
    'mode_s',
    'manufacturer',
    'registered_owner',
    'registered_owner_country_name',
  ];

  callsignColumns = ['airline', 'callsign', 'origin', 'destination'];
}
