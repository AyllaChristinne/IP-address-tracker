import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  private markerIcon = L.icon({
    iconSize: [36, 44],
    iconUrl: '../../assets/icon-location.svg',
  });

  constructor() {}

  createMarker(lat: number, lon: number): L.Marker {
    return L.marker([lat, lon], { icon: this.markerIcon });
  }
}
