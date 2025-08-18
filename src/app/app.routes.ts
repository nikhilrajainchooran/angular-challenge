import { Routes } from '@angular/router';

import { FlightSearch } from './features/search/pages/flight-search/flight-search';

export const routes: Routes = [
  { path: '', component: FlightSearch, pathMatch: 'full' },
  { path: '**', redirectTo: '' }, // Handle 404s
];