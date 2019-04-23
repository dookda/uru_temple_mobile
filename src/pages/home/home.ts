import { ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { DataProvider } from './../../providers/data/data';
import { DescPage } from './../desc/desc';
import { RoutingPage } from '../routing/routing';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public map: L.Map;
  public center: any;
  public zoom: any;

  public grod: any;
  public gter: any;
  public ghyb: any;
  public mbox: any;

  public tName: any = '';
  public marker: any;
  public lyrGroup: any;
  public imgArr: any;

  public r: any;

  constructor(
    public dataProvider: DataProvider,
    public modalCtrl: ModalController,
  ) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  async loadMap() {
    this.map = new L.Map('map', {
      center: [17.73, 100.55],
      zoom: 9,
      zoomControl: false
    });

    const mbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy;',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiY3NrZWxseSIsImEiOiJjamV1NTd1eXIwMTh2MzN1bDBhN3AyamxoIn0.Z2euk6_og32zgG6nQrbFLw'
    });

    const grod = L.tileLayer('http://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const ghyb = L.tileLayer('http://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    const gter = L.tileLayer('http://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // overlay map
    const cgiUrl = 'http://www.cgi.uru.ac.th/geoserver/ows?';

    const pro = L.tileLayer.wms(cgiUrl, {
      layers: 'th:province_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53'
    });

    const amp = L.tileLayer.wms(cgiUrl, {
      layers: '	th:amphoe_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53'
    });

    const tam = L.tileLayer.wms(cgiUrl, {
      layers: 'th:tambon_4326',
      format: 'image/png',
      transparent: true,
      zIndex: 5,
      CQL_FILTER: 'pro_code=53'
    });

    this.lyrGroup = L.layerGroup();

    const baseLayers = {
      'map box': mbox,
      'แผนที่ถนน': grod.addTo(this.map),
      'แผนที่ภาพดาวเทียม': ghyb,
      'แผนที่ภูมิประเทศ': gter
    };

    const overlayLayers = {
      'สถานีวัดน้ำฝน': this.lyrGroup.addTo(this.map),
      'ขอบเขตตำบล': tam.addTo(this.map),
      'ขอบเขตอำเภอ': amp.addTo(this.map),
      'ขอบเขตจังหวัด': pro.addTo(this.map)
    };
    // new L.Control.Layers(baseLayers, overlayLayers).addTo(this.map);

    this.r = L.Routing.control({
      // waypoints: [
      //   L.latLng(res.start.y, res.start.x),
      //   L.latLng(res.end.y, res.end.x)
      // ],
      routeWhileDragging: true,
      show: false
      // da: 'dadad'
    });
    this.r.addTo(this.map);

    // L.Routing.control({
    //   waypoints: [
    //     L.latLng(57.74, 11.94),
    //     L.latLng(57.6792, 11.949)
    //   ],
    //   routeWhileDragging: true
    // }).addTo(this.map);

    // const geojsonMarkerOptions = {
    //   radius: 8,
    //   fillColor: '#ff0000',
    //   color: '#5b0000',
    //   weight: 2,
    //   opacity: 1,
    //   fillOpacity: 0.8
    // };

    const icon = L.icon({
      iconUrl: 'http://cgi.uru.ac.th/marker/circus.png',
      iconSize: [32, 37],
      iconAnchor: [12, 37],
      popupAnchor: [5, -30]
    });

    await this.dataProvider.getTemple().then((res: any) => {
      this.marker = L.geoJSON(res, {
        pointToLayer: function (feature: any, latlng: any) {
          return L.marker(latlng, {
            icon: icon,
            properties: feature.properties.latitude,
            iconName: 'da'
          });
        },
        onEachFeature: (feature: any, layer: any) => {
          if (feature.properties) {
            layer.bindPopup(
              'ชื่อ: ' + feature.properties.wat + '</br>'
            );
          }
        }
      });
      this.lyrGroup.addLayer(this.marker);
      this.marker.on('click', (e: any) => {
        // const tName = e.layer.feature.properties.wat;
        // this.getImage(tName);
        // console.log(e)
        this.getData(e.latlng.lat, e.latlng.lng);
      });
    });

  }

  async  getData(lat: number, lng: number) {
    await this.dataProvider.getFeature(lat, lng).then((res: any) => {
      if (res.totalFeatures > 0) {
        let dat = res.features[0].properties;
        dat.lat = lat;
        dat.lng = lng;
        console.log(dat);
        this.gotoDesc(dat);
      }
    })
  }

  gotoDesc(feature: any) {
    console.log(feature)
    const modal = this.modalCtrl.create(DescPage, { feature: feature });
    modal.present();
  }

  gotoAbout() {
    const modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }

  gotoRouting() {
    console.log();
    const modal = this.modalCtrl.create(RoutingPage, { dada: 'data' });
    modal.present();
    modal.onDidDismiss((res: any) => {
      console.log(res);
      // const d = res;

      this.r.setWaypoints([
        L.latLng(res.start.y, res.start.x),
        L.latLng(res.end.y, res.end.x)
      ]);
    })
  }

}

export interface FeatureObj {
  code?: string;
  lat?: number;
  lng?: number;
  list?: string;
  no?: number;
  type?: string;
  rmk?: string;
  area?: number;
  all?: any;
}

