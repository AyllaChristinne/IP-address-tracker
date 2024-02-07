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
  message: string;
  status: 'fail';
  query: string;
}

export type IPData = IPDataSuccess | IPDataError;
