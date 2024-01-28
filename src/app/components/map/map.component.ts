import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() lat: number = 0;
  @Input() lon: number = 0;
  private map: any;

  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderMap();
  }

  private renderMap() {
    this.map = L.map('map').setView([this.lat, this.lon], 13);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        minZoom: 10,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    const marker = this.markerService.createMarker(this.lat, this.lon);
    marker.addTo(this.map);
  }
}
