import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchResult } from '../../../../core/models/api-response.model';
import { AviationDataService } from '../../../../core/services/aviation-data';
import { SearchType } from '../../../../core/types/search.types';
import { SEARCH_MATERIAL_MODULES } from '../../../../shared/modules/material.modules';
import { SearchForm } from '../../components/search-form/search-form';
import { SearchResults } from '../../components/search-results/search-results';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ...SEARCH_MATERIAL_MODULES,
    SearchForm,
    SearchResults,
  ],
  selector: 'app-flight-search',
  styleUrl: './flight-search.scss',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  private aviationDataService = inject(AviationDataService);
  private snackBar = inject(MatSnackBar);

  hasSearched = signal(false);
  isLoading = signal(false);
  searchResults = signal<SearchResult[]>([]);
  currentSearchType = signal<SearchType>('aircraft');

  handleSearch({ type, values }: { type: SearchType; values: string[] }) {
    this.hasSearched.set(true);
    this.isLoading.set(true);
    this.searchResults.set([]);
    this.currentSearchType.set(type);

    this.aviationDataService.fetchMultipleRecords(type, values).subscribe({
      next: (data) => {
        this.isLoading.set(false);
        this.searchResults.set(data);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.searchResults.set([]);
        this.snackBar.open(
          error.message || 'Failed to fetch search results. Please try again.',
          'Close',
          { duration: 5000 },
        );
      },
    });
  }

  handleFailedResults(errors: string[]) {
    if (errors.length) {
      this.snackBar.open(
        errors.length === 1
          ? errors[0]
          : `Some results could not be loaded (${errors.length} failed)`,
        'Close',
        { duration: 4000 },
      );
    }
  }
}
