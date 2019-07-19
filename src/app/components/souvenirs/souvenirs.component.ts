import { Component, OnInit } from "@angular/core";
import {
  LoadingService,
  StorageService,
  HttpService,
  ModalService,
  LocationService
} from "src/app/services/main.service.module";

declare const google: any;

@Component({
  selector: 'app-souvenirs',
  templateUrl: './souvenirs.component.html',
  styleUrls: ['./souvenirs.component.css']
})
export class SouvenirsComponent implements OnInit {

  public souvenirs = [];

  public searchFilter = {
    name: ""
  };

  constructor(
    private loadingService: LoadingService,
    private locationService: LocationService,
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService
  ) {}

  private map;

  private places_service;

  public async ngOnInit() {
    this.loadingService.showLoading();
    this.mapInit("baguio_map_hidden");
    await this.setsouvenirs();
    this.loadingService.hideLoading();
  }

  public async setsouvenirs() {
    let souvenirs = await this.storageService.get("souvenirs");
    if (souvenirs !== null) {
      souvenirs = JSON.parse(souvenirs);
    } else {
      souvenirs = await this.httpService
        .get("assets/data/souvenirs.json")
        .toPromise();
      await this.storageService.set(
        "souvenirs",
        JSON.stringify(souvenirs)
      );
    }
    this.souvenirs = souvenirs;
  }

  public async mapInit(map_id) {
    return new Promise(async resolve => {
      try {
        if (google !== undefined) {
          await setTimeout(async () => {
            this.map = await new google.maps.Map(
              document.getElementById(map_id)
            );
            this.places_service = new google.maps.places.PlacesService(
              this.map
            );
            resolve();
          }, 500);
        } else {
          setTimeout(() => {
            this.mapInit(map_id);
          }, 1000);
        }
      } catch (err) {
        setTimeout(() => {
          this.mapInit(map_id);
        }, 1000);
      }
    });
  }

}
