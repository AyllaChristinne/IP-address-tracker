import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { IPData } from '../models/ip.model';
import { IpService } from './ip.service';
import { AppComponent } from '../app.component';
import { HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';

describe('IpService', () => {
  let injector: Injector;
  let service: IpService;
  let httpMock: HttpTestingController;
  let mockIPData: IPData = {
    query: '80.80.80.80',
    status: 'success',
    region: 'NH',
    city: 'Amsterdam',
    zip: '1013',
    lat: 52.4001,
    lon: 4.87644,
    offset: 3600,
    isp: 'Freenom DNS Cloud',
  };

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IpService],
    });
    service = injector.get(IpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch IP data without specific IP', (done) => {
    service.fetchIp().subscribe((data) => {
      expect(data).toEqual(mockIPData);
      done();
    });

    const url = `${environment.getIpDataUrl}`;
    const req = httpMock.expectOne((request: HttpRequest<any>) => {
      return (
        request.url === url &&
        request.method === 'GET' &&
        request.params.get('fields') ===
          'query,city,offset,isp,lat,lon,zip,region,status'
      );
    });

    req.flush(mockIPData);
  });

  it('should fetch IP data with specific IP', (done) => {
    const ip = '80.80.80.80';
    service.fetchIp(ip).subscribe((data) => {
      expect(data).toEqual(mockIPData);
      done();
    });

    const url = `${environment.getIpDataUrl}${ip}`;
    const matchReq = httpMock.expectOne((request: HttpRequest<any>) => {
      return (
        request.url === url &&
        request.method === 'GET' &&
        request.params.get('fields') ===
          'query,city,offset,isp,lat,lon,zip,region,status'
      );
    });

    matchReq.flush(mockIPData);
  });
});
