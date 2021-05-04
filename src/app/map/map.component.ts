import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {ShapeService} from '../shape.service';
import 'leaflet.markercluster';
import {testData} from '../data/test_data';


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
  private shapes;
  testData = testData;

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

    const polygon = L.polygon([
      [48.45, 35.033333],
      [58.45, 35.033333],
      [51.51, -0.047]
    ]).addTo(this.map);

    const overlayMaps = {
      marker1: marker1,
      marker2: marker2,
      polygon: polygon
    };

    tiles.addTo(this.map);

    // adding two layers
    L.control.layers(baseMap, overlayMaps).addTo(this.map);

    // adding clustering
    const cluster = L.markerClusterGroup();
    const geoJsonLayer = L.geoJSON(this.testData, {
      style: function(feature) {
        return {
          color: 'red'
        };
      }
    });
    cluster.addLayer(geoJsonLayer);
    cluster.addTo(this.map);
  }


  constructor(private shapeService: ShapeService) {
  }

  private initStatesLayer(): void {
    const stateLayer = L.geoJSON(this.shapes, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      })
    });

    this.map.addLayer(stateLayer);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.shapeService.getStateShapes().subscribe(shapes => {
      this.shapes = shapes;
      this.initStatesLayer();
    });
  }

}
