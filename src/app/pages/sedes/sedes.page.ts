import { Component, OnInit } from '@angular/core';
import {GoogleMap, GoogleMaps} from "@ionic-native/google-maps";
import {LoadingService} from "../../services/loading.service";
import {ModalController, Platform, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.page.html',
  styleUrls: ['./sedes.page.scss'],
})
export class SedesPage implements OnInit {
  map: GoogleMap;
  loading: any;
  screen: any;
  sedes = [
    {lat: -8.112824, lng: -79.024193, title: 'CC El Virrey Stand Zg06 (recta de grau) - Trujillo - La Libertad'},

  ];
  constructor(
      private platform: Platform,
  ) { }

  ngOnInit() {
    this.platform.ready();
    this.loadMap();
    this.markers();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: -8.111011,
          lng: -79.027914
        },
        zoom: 15,
        tilt: 30
      }
    });
  }
  markers() {
    this.sedes.forEach(sede => {
      this.map.addMarkerSync({
        title: sede.title,
        position: sede
      });
    });

  }
}
