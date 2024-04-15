export interface IPDataSuccess {
  error: false;
  ip: string;
  city: string;
  region: string;
  postal: string;
  latitude: number;
  longitude: number;
  utc_offset: number; //offset ta em +- HHMM
  org: string;
}

export interface IPDataError {
  error: true;
  message: string;
  ip: string;
}

export type IPData = IPDataSuccess | IPDataError;

export interface Coordinates {
  lat: number;
  lon: number;
}
