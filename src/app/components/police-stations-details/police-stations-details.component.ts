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
  selector: 'app-police-stations-details',
  templateUrl: './police-stations-details.component.html',
  styleUrls: ['./police-stations-details.component.css']
})
export class PoliceStationsDetailsComponent implements OnInit {

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
    private loadingService: LoadingService,
    private locationService: LocationService,
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService
  ) {}

  private places_service;

  private map;

  private marker;

  private geocoder;

  async ngOnInit() {
    const getPlaceId = () => {
      return new Promise(
        resolve => {
          this.route.params.subscribe(params => {
            resolve(params["place_id"]);
          });
        }
      )
    }
    const place_id = await getPlaceId();
    await this.setPlaceDetails(place_id);
    this.location = await this.locationService.findMe();
    await this.mapInit("place_details_map");
    const marker = new google.maps.Marker({
      position: {
        lat: +this.place_details.geometry.location.lat,
        lng: +this.place_details.geometry.location.lng
      },
      map: this.map,
      title: this.place_details.name,
      icon: "assets/img/police-stations-marker.png"
    });
    await this.getDirection();
  }

  public async onAddressChange(evt) {
    this.loadingService.showLoading();
    this.location = {
      latitude: evt.geometry.location.lat(),
      longitude: evt.geometry.location.lng(),
      address: this.location.address
    }
    await this.mapInit("place_details_map");
    const marker = new google.maps.Marker({
      position: {
        lat: +this.place_details.geometry.location.lat,
        lng: +this.place_details.geometry.location.lng
      },
      map: this.map,
      title: this.place_details.name,
      icon: "assets/img/police-stations-marker.png"
    });
    this.loadingService.hideLoading();
  }

  public async mapInit(map_id) {
    return new Promise(async resolve => {
      try {
        if (google !== undefined) {
          this.geocoder = await new google.maps.Geocoder();
          await setTimeout(async () => {
            const minZoomLevel = 10; // set min zoom level to 0
            const strictBounds = await new google.maps.LatLngBounds(
              await new google.maps.LatLng(16.3627625, 120.5452001),
              await new google.maps.LatLng(16.4361881, 120.6323503)
            ); // set strict bounds to iceland only
            let center: any;
            center = {
              lat: this.location.latitude,
              lng: this.location.longitude
            };
            this.map = await new google.maps.Map(
              document.getElementById(map_id),
              {
                center,
                zoom: minZoomLevel,
                disableDefaultUI: true
              }
            );
            this.places_service = new google.maps.places.PlacesService(this.map);
            await google.maps.event.addListener(
              this.map,
              "zoom_changed",
              () => {
                if (this.map.getZoom() < minZoomLevel) {
                  this.map.setZoom(minZoomLevel);
                }
              }
            );
            await google.maps.event.addListener(this.map, "dragend", () => {
              if (strictBounds.contains(this.map.getCenter())) {
                return;
              }
              const c = this.map.getCenter();
              let x = c.lng();
              let y = c.lat();
              const maxX = strictBounds.getNorthEast().lng();
              const maxY = strictBounds.getNorthEast().lat();
              const minX = strictBounds.getSouthWest().lng();
              const minY = strictBounds.getSouthWest().lat();

              if (x < minX) {
                x = minX;
              }
              if (x > maxX) {
                x = maxX;
              }
              if (y < minY) {
                y = minY;
              }
              if (y > maxY) {
                y = maxY;
              }
              this.map.setCenter(new google.maps.LatLng(y, x));
            });
            this.marker = new google.maps.Marker({
              position: center,
              map: this.map,
              draggable: true
            });
            this.setGeocodeLocation(this.marker.getPosition().lat(), this.marker.getPosition().lng());
            await this.marker.setAnimation(google.maps.Animation.BOUNCE);
            await this.marker.addListener("dragend", () => {
              this.setGeocodeLocation(this.marker.getPosition().lat(), this.marker.getPosition().lng());
            });
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

  public async setGeocodeLocation(lat: number, lng: number) {
    this.map.setCenter({
      lat,
      lng
    });
    this.marker.setPosition({
      lat,
      lng
    });
    const onGeocodingLocationSuccess = (results: any, status: any) => {
      if (status === "OK") {
        if (results[0]) {
          this.location = {
            latitude: lat,
            longitude: lng,
            address: results[0]["formatted_address"]
          }
        } else {
          this.location = {
            latitude: lat,
            longitude: lng,
            address: ""
          }
        }
      }
    };
    const coor = {
      location: {
        lat,
        lng
      }
    };
    await this.geocoder.geocode(coor, onGeocodingLocationSuccess);
  }

  public async setPlaceDetails(place_id) {
    const police_stations = JSON.parse(await this.storageService.get("police_stations"));
    for (const i in police_stations) {
      if (police_stations[i].place_id === place_id) {
        this.place_details = police_stations[i];
        console.log(this.place_details);
      }
    }
  }

  public async getDirection() {
    await this.mapInit("place_details_map");
    const marker = new google.maps.Marker({
      position: {
        lat: +this.place_details.geometry.location.lat,
        lng: +this.place_details.geometry.location.lng
      },
      map: this.map,
      title: this.place_details.name,
      icon: "assets/img/map-markers/police-stations-marker.png"
    });
    const _start = {
      lat: +this.location.latitude,
      lng: +this.location.longitude
    };
    const _end = {
      lat: +this.place_details.geometry.location.lat,
      lng: +this.place_details.geometry.location.lng
    };
    const directionsService = await new google.maps.DirectionsService();
    const directionsDisplay = await new google.maps.DirectionsRenderer();
    await directionsDisplay.setMap(this.map);
    await directionsDisplay.setOptions({ suppressMarkers: true });
    await directionsService.route(
      {
        origin: _start,
        destination: _end,
        travelMode: "DRIVING"
      },
      async (response: any, status: any) => {
        if (status === "OK") {
          this.place_details.legs = response.routes[0].legs;
          await directionsDisplay.setDirections(response);
        } else {
          this.modalService.setModal({
            isOpen: true,
            header_title: "Warning!",
            body_content: `
              <p>The location cannot be traveled by land, you can drag the marker to update the Location.</p>
            `,
            footers: [
              {
                name: "Continue",
                color: "danger",
                action: async () => {}
              }
            ],
            options: {
              ignoreBackdropClick: true
            }
          });
        }
      }
    );
  }

  public async findMe() {
    this.location = await this.locationService.findMe();
    await this.mapInit("place_details_map");
    const marker = new google.maps.Marker({
      position: {
        lat: +this.place_details.geometry.location.lat,
        lng: +this.place_details.geometry.location.lng
      },
      map: this.map,
      title: this.place_details.name,
      icon: "assets/img/police-stations-marker.png"
    });
  }

  public getDay(d) {
    if (+d === 0) {
      return "Sunday";
    }
    if (+d === 1) {
      return "Monday";
    }
    if (+d === 2) {
      return "Tuesday";
    }
    if (+d === 3) {
      return "Wednesday";
    }
    if (+d === 4) {
      return "Thursday";
    }
    if (+d === 5) {
      return "Friday";
    }
    if (+d === 6) {
      return "Saturday";
    }
  }

  callNumber(phone_number) {
    try {
      window["plugins"].CallNumber.callNumber(() => {}, () => {}, phone_number, true);
    } catch (err) {}
  }

}
