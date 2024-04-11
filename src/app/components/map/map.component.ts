import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnChanges {
  @Input({ required: true }) coordinates: { lat: number; lon: number } = {
    lat: 0,
    lon: 0,
  };
  private map: any;
  private markerElement: HTMLElement | undefined = undefined;

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    this.renderMap();
  }

  ngOnChanges(): void {
    this.renderMap();
  }

  private renderMap() {
    if (!this.map) {
      this.map = L.map('map', {
        center: [this.coordinates.lat + 0.003, this.coordinates.lon],
        zoom: 13,
        boxZoom: false,
        zoomControl: false,
        doubleClickZoom: false,
        dragging: false,
        keyboard: false,
        scrollWheelZoom: false,
      });

      const tiles = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 20,
          minZoom: 14,
        }
      );
      tiles.addTo(this.map);
    } else {
      this.map.setView(
        [this.coordinates.lat + 0.003, this.coordinates.lon],
        13
      );
    }

    const marker = this.markerService.createMarker(
      this.coordinates.lat,
      this.coordinates.lon
    );

    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    if (marker) {
      marker.addTo(this.map);
      this.markerElement = marker.getElement();
    }

    if (this.markerElement) {
      this.markerElement.tabIndex = -1;
    }
  }
}
