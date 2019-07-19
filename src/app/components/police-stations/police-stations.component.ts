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
  selector: "app-police-stations",
  templateUrl: "./police-stations.component.html",
  styleUrls: ["./police-stations.component.css"]
})
export class PoliceStationsComponent implements OnInit {
  public police_stations = [];

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
    await this.locationService.findMe();
    await this.setPoliceStations();
    this.loadingService.hideLoading();
  }

  public async setPoliceStations() {
    let police_stations = await this.storageService.get("police_stations");
    if (police_stations !== null) {
      police_stations = JSON.parse(police_stations);
    } else {
      police_stations = await this.httpService
        .get("assets/data/police_stations.json")
        .toPromise();
      await this.storageService.set(
        "police_stations",
        JSON.stringify(police_stations)
      );
    }
    for (const i in police_stations) {
      police_stations[i].nearme_score = await this.HaversineInMeter(
        this.locationService.location.latitude,
        this.locationService.location.longitude,
        police_stations[i].geometry.location.lat,
        police_stations[i].geometry.location.lng);
    }
    this.police_stations = police_stations;
  }

  public deg2rad(angle: number): number {
    return angle * 0.017453292519943295;
  }

  public HaversineInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in KM
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    // using Haversine Forumula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  public HaversineInMeter(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    return this.HaversineInKm(lat1, lon1, lat2, lon2) * 1000;
  }
}
