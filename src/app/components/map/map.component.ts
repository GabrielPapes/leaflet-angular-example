import { AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(
    private markerService: MarkerService
  ) { }

  private startMap(): void {
    this.map = L.map('map', {
      //Salvador - BA
      center: [-12.908, -38.532],
      zoom: 1
    });
  }

  private initiateOpenStreetMap() {
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      minZoom: 3,
      attribution: osmAttrib
    });
    osm.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.startMap();
    this.initiateOpenStreetMap();
    this.markerService.addCities(this.map);
  }

}
