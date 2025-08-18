import { Aircraft } from './aircraft.model';
import { FlightRoute } from './flight-route.model';

export interface CallsignResponse {
  response: {
    flightroute: FlightRoute;
  };
}

export interface AircraftResponse {
  response: {
    aircraft: Aircraft;
  };
}

export interface ErrorResult {
  error: {
    message: string;
    status?: number;
  };
}

export type SearchResult = CallsignResponse | AircraftResponse | ErrorResult;
