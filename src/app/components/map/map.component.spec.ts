import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MarkerService } from '../../services/marker.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let markerService: jasmine.SpyObj<MarkerService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MarkerService', ['createMarker']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: MarkerService, useValue: spy }],
    });

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    markerService = TestBed.inject(
      MarkerService
    ) as jasmine.SpyObj<MarkerService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the map when coordinates are provided', () => {
    const coordinates = { lat: 10, lon: 20 };
    component.coordinates = coordinates;
    fixture.detectChanges();

    expect(component['map']).toBeDefined();
    expect(markerService.createMarker).toHaveBeenCalledWith(
      coordinates.lat,
      coordinates.lon
    );
  });
});
