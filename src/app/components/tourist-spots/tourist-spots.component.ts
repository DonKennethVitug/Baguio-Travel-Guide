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
  selector: "app-tourist-spots",
  templateUrl: "./tourist-spots.component.html",
  styleUrls: ["./tourist-spots.component.css"]
})
export class TouristSpotsComponent implements OnInit {
  public tourist_spots = [];

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
    await this.mapInit("baguio_map_hidden");
    await this.setTouristSpots();
    this.loadingService.hideLoading();
  }

  public async setTouristSpots() {
    let tourist_spots = await this.storageService.get("tourist_spots");
    if (tourist_spots !== null) {
      tourist_spots = JSON.parse(tourist_spots);
    } else {
      tourist_spots = await this.httpService
        .get("assets/data/tourist_spots.json")
        .toPromise();
      await this.storageService.set(
        "tourist_spots",
        JSON.stringify(tourist_spots)
      );
    }
    this.tourist_spots = tourist_spots;
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
