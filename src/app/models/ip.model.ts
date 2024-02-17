export interface IPDataSuccess {
  status: 'success';
  query: string;
  city: string;
  region: string;
  zip: string;
  lat: number;
  lon: number;
  offset: number;
  isp: string;
}

export interface IPDataError {
  status: 'fail';
  message: string;
  query: string;
}

export type IPData = IPDataSuccess | IPDataError;

export interface Coordinates {
  lat: number;
  lon: number;
}
