import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  private map;

  private initMap(): void {

    // init map
    this.map = L.map('map', {
      center: [35.033333, 48.45],
      zoom: 3
    });

    // tiles
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // tiles object
    const baseMap = {
      OSM: tiles,
      Google: googleStreets,
    };

    tiles.addTo(this.map);

    // adding two layers
    L.control.layers(baseMap).addTo(this.map);
  }


  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

}
