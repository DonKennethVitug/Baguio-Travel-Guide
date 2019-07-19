import { Component, OnInit } from '@angular/core';
import {
  LoadingService,
  StorageService,
  HttpService,
  ModalService,
  LocationService
} from "src/app/services/main.service.module";
import { ActivatedRoute } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-ghost-stories-details',
  templateUrl: './ghost-stories-details.component.html',
  styleUrls: ['./ghost-stories-details.component.css']
})
export class GhostStoriesDetailsComponent implements OnInit {

  public google_options = {
    types: new Array(),
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(16.3627625, 120.5452001),
      new google.maps.LatLng(16.4361881, 120.6323503)
    )
  };

  public place_details;

  public location = {
    latitude: 16.4023,
    longitude: 120.596,
    address: "Baguio, Benguet, Philippines"
  };

  constructor(
    private readonly route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const getPlaceId = () => {
      return new Promise(
        resolve => {
          this.route.params.subscribe(params => {
            resolve(params["name"]);
          });
        }
      )
    }
    const name = await getPlaceId();
    await this.setPlaceDetails(name);
  }

  public async setPlaceDetails(name) {
    const ghost_stories = JSON.parse(await this.storageService.get("ghost"));
    for (const i in ghost_stories) {
      if (ghost_stories[i].name === name) {
        this.place_details = ghost_stories[i];
        console.log(this.place_details);
      }
    }
  }

}
