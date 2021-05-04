import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

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
      center: [48.45, 35.033333],
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

    const marker1 = L.marker([48.45, 35.033333], {draggable: true})
      .bindPopup('Some text')
      .addTo(this.map);

    const marker2 = L.marker([58.45, 35.033333], {})
      .bindPopup('Some text')
      .addTo(this.map);


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
