import { Component, OnInit, ViewChild } from "@angular/core";
import {
  LoadingService,
  StorageService,
  HttpService,
  ModalService,
  LocationService
} from "src/app/services/main.service.module";

declare const google: any;

@Component({
  selector: 'app-transients',
  templateUrl: './transients.component.html',
  styleUrls: ['./transients.component.css']
})
export class TransientsComponent implements OnInit {

  public transients = [];

  public searchFilter = {
    name: ""
  };

  public allowed_transients = [2,3,4];

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
    await this.setTransients();
    this.loadingService.hideLoading();
  }

  public async setTransients() {
    this.transients = [];
    let transients = await this.storageService.get("transients");
    if (transients !== null) {
      transients = JSON.parse(transients);
    } else {
      transients = await this.httpService
        .get("assets/data/transients.json")
        .toPromise();
      await this.storageService.set(
        "transients",
        JSON.stringify(transients)
      );
    }
    this.transients = transients;
  }

  codeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    return new Promise(
      (resolve, reject) => {
        geocoder.geocode( { 'address': address}, (results, status) => {
          if (status == 'OK') {
            setTimeout(
              () => {
                resolve({
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                })
              },
              2000
            )
          } else {
            reject();
          }
        });
      }
    )
  }

}
