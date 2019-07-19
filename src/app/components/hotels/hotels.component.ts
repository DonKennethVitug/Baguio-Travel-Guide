import { Component, OnInit, ViewChild } from "@angular/core";
import {
  LoadingService,
  StorageService,
  HttpService,
  ModalService,
  LocationService
} from "src/app/services/main.service.module";
import { HotelsModalComponent } from './hotels-modal/hotels-modal.component';

declare const google: any;

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  public hotels = [];

  public searchFilter = {
    name: ""
  };

  public allowed_hotels = [2,3,4];

  constructor(
    private loadingService: LoadingService,
    private locationService: LocationService,
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService
  ) {}

  @ViewChild(HotelsModalComponent)
  private readonly hotelsModalComponent: HotelsModalComponent;

  private map;

  private places_service;

  public async ngOnInit() {
    this.loadingService.showLoading();
    await this.setHotels();
    this.loadingService.hideLoading();
  }

  public async setHotels() {
    this.hotels = [];
    let hotels = await this.storageService.get("hotels");
    if (hotels !== null) {
      hotels = JSON.parse(hotels);
    } else {
      hotels = await this.httpService
        .get("assets/data/hotels.json")
        .toPromise();
      await this.storageService.set(
        "hotels",
        JSON.stringify(hotels)
      );
    }
    for (const i in hotels) {
      let found = false;
      for (const j in this.allowed_hotels) {
        if (+this.allowed_hotels[j] === +hotels[i]["hotel type"]) {
          found = true;
        }
      }
      if (found) {
        this.hotels.push(hotels[i]);
      }
    }
  }

  public showFilter() {
    this.hotelsModalComponent.show();
  }

  public async onFilter(filters) {
    this.allowed_hotels = [];
    for(const i in filters) {
      if (filters[i].active) {
        this.allowed_hotels.push(+filters[i].method);
      }
    }
    await this.setHotels();
  }

}
