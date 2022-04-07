import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  cities: string = "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-100-mun.json";

  constructor(
    private http: HttpClient,
  ) { }

  addCities(map: L.Map) {
    this.http.get(this.cities).subscribe((data: any) => {
      L.geoJSON(data, {
        style: (feature) => {
          return {
            color: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 0.5,
            weight: 1
          };
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);
    });
  }
}
