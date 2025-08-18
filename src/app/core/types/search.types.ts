export type SearchType = 'aircraft' | 'callsign';

export interface SearchFormValue {
  type: SearchType;
  values: string[];
}

export interface SearchRequest {
  type: SearchType;
  values: string[];
}
