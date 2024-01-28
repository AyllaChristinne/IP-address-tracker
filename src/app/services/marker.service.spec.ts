import { TestBed } from '@angular/core/testing';
import { MarkerService } from './marker.service';
import * as L from 'leaflet';

describe('MarkerService', () => {
  let service: MarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a marker with the correct icon', () => {
    const lat = 10;
    const lon = 20;
    const marker = service.createMarker(lat, lon);

    expect(marker).toBeTruthy();
    expect(marker.getLatLng().lat).toBe(lat);
    expect(marker.getLatLng().lng).toBe(lon);

    const icon = marker.options.icon as L.Icon;
    expect(icon.options.iconSize).toEqual([36, 44]);
    expect(icon.options.iconUrl).toContain('icon-location.svg');
  });
});
