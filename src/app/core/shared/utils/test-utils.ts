import { AircraftResponse, CallsignResponse, ErrorResult } from '../../models/api-response.model';

export const mockAircraftResult: AircraftResponse = {
  response: {
    aircraft: {
      registration: 'N123AB',
      manufacturer: 'Boeing',
      url_photo_thumbnail: 'https://example.com/thumb.jpg',
      type: '',
      icao_type: '',
      mode_s: '',
      registered_owner_country_iso_name: '',
      registered_owner_country_name: '',
      registered_owner_operator_flag_code: null,
      registered_owner: '',
      url_photo: null,
    },
  },
};

export const mockCallsignResult: CallsignResponse = {
  response: {
    flightroute: {
      callsign: 'DLH400',
      airline: {
        name: 'Lufthansa',
        icao: '',
        iata: null,
        country: '',
        country_iso: '',
        callsign: null,
      },
      origin: {
        name: 'Frankfurt',
        country_iso_name: '',
        country_name: '',
        elevation: 0,
        iata_code: '',
        icao_code: '',
        latitude: 0,
        longitude: 0,
        municipality: '',
      },
      destination: {
        name: 'New York',
        country_iso_name: '',
        country_name: '',
        elevation: 0,
        iata_code: '',
        icao_code: '',
        latitude: 0,
        longitude: 0,
        municipality: '',
      },
      callsign_icao: null,
      callsign_iata: null,
    },
  },
};

export const mockErrorResult: ErrorResult = {
  error: {
    message: 'Not found',
  },
};
