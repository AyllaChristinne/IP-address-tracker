import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { IpService } from '../../services/ip.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnDestroy {
  coordinates: { lat: number; lon: number } = { lat: 0, lon: 0 };
  loading: boolean = true;
  private map: any;

  private ipDataSubscription: Subscription = new Subscription();
  private ipDataLoadingSubscription: Subscription = new Subscription();

  constructor(
    private markerService: MarkerService,
    private ipService: IpService
  ) {}

  ngOnInit(): void {
    this.ipDataSubscription = this.ipService.ipData$.subscribe((res) => {
      if (res && res.status === 'success') {
        this.coordinates = { lat: res.lat, lon: res.lon };
        this.renderMap();
      }
    });

    this.ipDataLoadingSubscription = this.ipService.loading$.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.ipDataSubscription) {
      this.ipDataSubscription.unsubscribe();
    }
    if (this.ipDataLoadingSubscription) {
      this.ipDataLoadingSubscription.unsubscribe();
    }
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
        [this.coordinates.lat + 0.005, this.coordinates.lon],
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

    marker.addTo(this.map);
  }
}
