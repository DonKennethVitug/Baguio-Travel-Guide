import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { LoadingService, StorageService, HttpService, ModalService, LocationService } from "src/app/services/main.service.module";
import { Router } from '@angular/router';
import { resolve } from 'url';
import { BaguioMapModalComponent } from './baguio-map-modal/baguio-map-modal.component';

declare const google: any;

@Component({
  selector: "app-baguio-map",
  templateUrl: "./baguio-map.component.html",
  styleUrls: ["./baguio-map.component.css"]
})
export class BaguioMapComponent implements OnInit, OnDestroy {

  constructor(
    private loadingService: LoadingService,
    private locationService: LocationService,
    private storageService: StorageService,
    private httpService: HttpService,
    private modalService: ModalService,
    private readonly router: Router
  ) {}

  @ViewChild(BaguioMapModalComponent)
  private readonly baguioMapModalComponent: BaguioMapModalComponent;

  async ngOnInit() {
    try {
      document.documentElement.style.height = "100%";
      document.body.style.overflow = "hidden";
    } catch (err) {}
    this.loadingService.showLoading();
    this.location = await this.locationService.findMe();
    await this.mapInit("baguio_map");
    await this.setTouristSpots();
    await this.setPoliceStations();
    await this.setHotels();
    await this.setRestaurants();
    await this.setTransients();
    await this.setSouvenirs();
    this.loadingService.hideLoading();
  }

  async ngOnDestroy() {
    try {
      document.documentElement.style.height = "unset";
      document.body.style.overflow = "unset";
    } catch (err) {}
  }

  private geocoder;

  private location = {
    latitude: 16.4023,
    longitude: 120.596,
    address: "Baguio, Benguet, Philippines"
  };

  private map;

  private marker;

  private places_service;
  
  private tourist_spots_markers = [];

  private police_stations_markers = [];

  private hotels_markers = [];

  private restaurants_markers = [];

  private transients_markers = [];

  private souvenirs_markers = [];

  public async mapInit(map_id) {
    return new Promise(async resolve => {
      try {
        if (google !== undefined) {
          this.geocoder = await new google.maps.Geocoder();
          await setTimeout(async () => {
            const minZoomLevel = 12; // set min zoom level to 0
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
            await this.marker.setAnimation(google.maps.Animation.BOUNCE);
            await this.marker.addListener("dragend", () => {
              this.location = {
                address: this.location.address,
                latitude: this.marker.getPosition().lat(),
                longitude: this.marker.getPosition().lng()
              }
              this.map.setCenter(this.marker.getPosition());
            });

            const controlDiv2: any = document.createElement("div");
            // Set CSS for the control border.
            var controlUI2 = document.createElement('div');
            controlUI2.style.backgroundColor = '#fff';
            controlUI2.style.border = '2px solid #fff';
            controlUI2.style.borderRadius = '3px';
            controlUI2.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
            controlUI2.style.cursor = 'pointer';
            controlUI2.style.marginBottom = '22px';
            controlUI2.style.textAlign = 'center';
            controlUI2.title = 'Click to select filter';
            controlDiv2.appendChild(controlUI2);

            // Set CSS for the control interior.
            var controlText2 = document.createElement('div');
            controlText2.style.color = 'rgb(25,25,25)';
            controlText2.style.fontFamily = 'Roboto,Arial,sans-serif';
            controlText2.style.fontSize = '16px';
            controlText2.style.lineHeight = '38px';
            controlText2.style.paddingLeft = '5px';
            controlText2.style.paddingRight = '5px';
            controlText2.innerHTML = 'Filter Map';
            controlUI2.appendChild(controlText2);
            controlUI2.addEventListener('click', () => {
              this.baguioMapModalComponent.show();
            });

            this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv2);

            const controlDiv: any = document.createElement("div");
            const controlUI = document.createElement("button");
            controlUI.style.backgroundColor = "#fff";
            controlUI.style.border = "none";
            controlUI.style.outline = "none";
            controlUI.style.width = "28px";
            controlUI.style.height = "28px";
            controlUI.style.borderRadius = "2px";
            controlUI.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
            controlUI.style.cursor = "pointer";
            controlUI.style.marginTop = "10px";
            controlUI.style.marginRight = "10px";
            controlUI.style.padding = "0";
            controlUI.title = "Your Location";
            controlDiv.appendChild(controlUI);

            const controlText = document.createElement("div");
            controlText.style.margin = "5px";
            controlText.style.width = "18px";
            controlText.style.height = "18px";
            controlText.style.backgroundImage =
              "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
            controlText.style.backgroundSize = "180px 18px";
            controlText.style.backgroundPosition = "0 0";
            controlText.style.backgroundRepeat = "no-repeat";
            controlUI.appendChild(controlText);

            // Setup the click event listeners: simply set the map to Chicago.
            controlUI.addEventListener("click", async () => {
              this.loadingService.showLoading();
              this.location = await this.locationService.findMe();
              this.marker.setPosition({
                lat: this.location.latitude,
                lng: this.location.longitude
              });
              this.map.setCenter({
                lat: this.location.latitude,
                lng: this.location.longitude
              });
              this.loadingService.hideLoading();
            });
            controlDiv.index = 1;
            this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
              controlDiv
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

  public async setGeocodeLocation(lat: number, lng: number) {
    this.loadingService.showLoading();
    this.map.setCenter({
      lat,
      lng
    });
    this.marker.setPosition({
      lat,
      lng
    });
    const onGeocodingLocationSuccess = (results: any, status: any) => {
      this.loadingService.hideLoading();
      if (status === "OK") {
        this.location.latitude = lat;
        this.location.longitude = lng;
        if (results[0]) {
          this.location.address = results[0]["formatted_address"];
        } else {
          this.location.address = "";
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

  public async setTouristSpots() {
    let tourist_spots = await this.storageService.get("tourist_spots");
    if (tourist_spots !== null) {
      tourist_spots = JSON.parse(tourist_spots);
    } else {
      tourist_spots = await this.httpService.get("assets/data/tourist_spots.json").toPromise();
      await this.storageService.set(
        "tourist_spots",
        JSON.stringify(tourist_spots)
      );
    }
    for (const i in tourist_spots) {
      if (tourist_spots.hasOwnProperty(i)) {
        this.tourist_spots_markers[i] = await new google.maps.Marker({
          position: {
            lat: +tourist_spots[i].geometry.location.lat,
            lng: +tourist_spots[i].geometry.location.lng
          },
          map: this.map,
          title: tourist_spots[i].name,
          icon: "assets/img/map-markers/tourist-spots-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.tourist_spots_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: tourist_spots[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + tourist_spots[i].image + `">
                    <br><br>
                    <p>` + tourist_spots[i].review.text + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/tourist-spots-details/" + tourist_spots[i].place_id]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }

  public async setPoliceStations() {
    let police_stations = await this.storageService.get("police_stations");
    if (police_stations !== null) {
      police_stations = JSON.parse(police_stations);
    } else {
      police_stations = await this.httpService.get("assets/data/police_stations.json").toPromise();
      await this.storageService.set(
        "police_stations",
        JSON.stringify(police_stations)
      );
    }
    for (const i in police_stations) {
      if (police_stations.hasOwnProperty(i)) {
        this.police_stations_markers[i] = await new google.maps.Marker({
          position: {
            lat: +police_stations[i].geometry.location.lat,
            lng: +police_stations[i].geometry.location.lng
          },
          map: this.map,
          title: police_stations[i].name,
          icon: "assets/img/map-markers/police-stations-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.police_stations_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: police_stations[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + police_stations[i].image + `">
                    <br><br>
                    <p>` + police_stations[i].review.text + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/police-stations-details/" + police_stations[i].place_id]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }

  public async setHotels() {
    let hotels = await this.storageService.get("hotels");
    if (hotels !== null) {
      hotels = JSON.parse(hotels);
    } else {
      hotels = await this.httpService.get("assets/data/hotels.json").toPromise();
      await this.storageService.set(
        "hotels",
        JSON.stringify(hotels)
      );
    }
    for (const i in hotels) {
      if (hotels.hasOwnProperty(i)) {
        this.hotels_markers[i] = await new google.maps.Marker({
          position: {
            lat: +hotels[i].geometry.location.lat,
            lng: +hotels[i].geometry.location.lng
          },
          map: this.map,
          title: hotels[i].name,
          icon: "assets/img/map-markers/hotels-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.hotels_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: hotels[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + hotels[i].image + `">
                    <br><br>
                    <p>` + hotels[i].description + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/hotels-details/" + hotels[i].name]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }
  
  public async setTransients() {
    let transients = await this.storageService.get("transients");
    if (transients !== null) {
      transients = JSON.parse(transients);
    } else {
      transients = await this.httpService.get("assets/data/transients.json").toPromise();
      await this.storageService.set(
        "transients",
        JSON.stringify(transients)
      );
    }
    for (const i in transients) {
      if (transients.hasOwnProperty(i)) {
        this.transients_markers[i] = await new google.maps.Marker({
          position: {
            lat: +transients[i].geometry.location.lat,
            lng: +transients[i].geometry.location.lng
          },
          map: this.map,
          title: transients[i].name,
          icon: "assets/img/map-markers/transients-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.transients_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: transients[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + transients[i].image + `">
                    <br><br>
                    <p>` + transients[i].description + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/transients-details/" + transients[i].name]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }

  public async setRestaurants() {
    let restaurants = await this.storageService.get("restaurants");
    if (restaurants !== null) {
      restaurants = JSON.parse(restaurants);
    } else {
      restaurants = await this.httpService.get("assets/data/restaurants.json").toPromise();
      await this.storageService.set(
        "restaurants",
        JSON.stringify(restaurants)
      );
    }
    for (const i in restaurants) {
      if (restaurants.hasOwnProperty(i)) {
        this.restaurants_markers[i] = await new google.maps.Marker({
          position: {
            lat: +restaurants[i].geometry.location.lat,
            lng: +restaurants[i].geometry.location.lng
          },
          map: this.map,
          title: restaurants[i].name,
          icon: "assets/img/map-markers/restaurants-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.restaurants_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: restaurants[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + restaurants[i].image + `">
                    <br><br>
                    <p>` + restaurants[i].review.text + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/restaurant-details/" + restaurants[i].place_id]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }

  public async setSouvenirs() {
    let souvenirs = await this.storageService.get("souvenir_stores");
    if (souvenirs !== null) {
      souvenirs = JSON.parse(souvenirs);
    } else {
      souvenirs = await this.httpService.get("assets/data/souvenir_stores.json").toPromise();
      await this.storageService.set(
        "souvenirs",
        JSON.stringify(souvenirs)
      );
    }
    for (const i in souvenirs) {
      if (souvenirs.hasOwnProperty(i)) {
        this.souvenirs_markers[i] = await new google.maps.Marker({
          position: {
            lat: +souvenirs[i].geometry.location.lat,
            lng: +souvenirs[i].geometry.location.lng
          },
          map: this.map,
          title: souvenirs[i].name,
          icon: "assets/img/map-markers/souvenirs-marker.png"
        });

        const setClick = () => {
          return new Promise(
            async (resolve) => {
              await this.souvenirs_markers[i].addListener("click", async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: souvenirs[i].name,
                  body_content: `
                    <img class="img-fluid" src="` + souvenirs[i].image + `">
                    <br><br>
                    <p>` + souvenirs[i].review.text + `</p>
                  `,
                  footers: [
                    {
                      name: "View More Details",
                      color: "danger",
                      action: async () => {
                        this.router.navigate(["/souvenir-stores-details/" + souvenirs[i].name]);
                      }
                    }
                  ]
                });
              });
              resolve();
            }
          )
        }
        await setClick();
      }
    }
  }

  public async onFilter(filters) {
    await this.mapInit("baguio_map");
    for(const i in filters) {
      if (filters[i].active) {
        try {
          this[filters[i].method]();
        } catch (err) {}
      }
    }
  }
}
