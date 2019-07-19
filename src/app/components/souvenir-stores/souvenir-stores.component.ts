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
  selector: 'app-souvenir-stores',
  templateUrl: './souvenir-stores.component.html',
  styleUrls: ['./souvenir-stores.component.css']
})
export class SouvenirStoresComponent implements OnInit {

  public souvenir_stores = [];

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
    await this.setSouvenirs();
    this.loadingService.hideLoading();
  }

  public async setSouvenirs() {
    let souvenir_stores = await this.storageService.get("souvenir_stores");
    if (souvenir_stores !== null) {
      souvenir_stores = JSON.parse(souvenir_stores);
    } else {
      souvenir_stores = await this.httpService
        .get("assets/data/souvenir_stores.json")
        .toPromise();
      for (const i in souvenir_stores) {
        if (souvenir_stores[i].rating === undefined) {
          souvenir_stores[i].rating = 0;
        }
      }
      await this.storageService.set(
        "souvenir_stores",
        JSON.stringify(souvenir_stores)
      );
    }
    this.souvenir_stores = souvenir_stores;
  }

}
