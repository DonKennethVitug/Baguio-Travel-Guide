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
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  public foods = [];

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
    await this.setFoods();
    this.loadingService.hideLoading();
  }

  public async setFoods() {
    let foods = await this.storageService.get("foods");
    if (foods !== null) {
      foods = JSON.parse(foods);
    } else {
      foods = await this.httpService
        .get("assets/data/foods.json")
        .toPromise();
      await this.storageService.set(
        "foods",
        JSON.stringify(foods)
      );
    }
    this.foods = foods;
    let restaurants = await this.storageService.get("restaurants");
    if (restaurants !== null) {
      restaurants = JSON.parse(restaurants);
    } else {
      restaurants = await this.httpService
        .get("assets/data/restaurants.json")
        .toPromise();
      await this.storageService.set(
        "restaurants",
        JSON.stringify(restaurants)
      );
    }
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
