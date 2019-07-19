import { Component, OnInit } from "@angular/core";
import {
  RouteService,
  ModalService,
  LoadingService,
  HttpService,
  StorageService
} from "../services/main.service.module";

declare const google: any;
declare const Connection: any;
declare const navigator: any;

@Component({
  selector: "app-root",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  public isAppReady = false;

  constructor(
    private readonly routeService: RouteService,
    private readonly modalService: ModalService,
    private readonly loadingService: LoadingService,
    private readonly httpService: HttpService,
    private readonly storageService: StorageService
  ) {}

  public  async ngOnInit() {
    let isCordovaApp =
      document.URL.indexOf("http://") === -1 &&
      document.URL.indexOf("https://") === -1;
    if (isCordovaApp) {
      await this.checkConnection();
      document.addEventListener('offline', e => {
        if (this.isAppReady === true) {
          this.isAppReady = false;
          alert("No network connection. Click Ok to restart app.");
          location.reload();
        }
      }, false);
      await this.checkMobileDeviceReady();
    }
    await this.routeService.startStateListener();
    await this.onGoogleLoaded();
    await this.setStorage();
    setTimeout(
      async () => {
        this.isAppReady = true;
        this.modalService.setModal({
          options: {
            ignoreBackdropClick: true
          },
          isOpen: true,
          header_title: "Welcome to Baguio Travel Guide",
          body_content: `
          <img class="img-fluid" src="assets/img/lion-head.jpg"><br><br>
            <p>The City of Pines is always a refreshing change of scenery from the hot and hectic metro.</p>
            <p>If you find yourself up in the mountains to relish its cool weather, why not take it up a notch and redefine your vacation experience with our Baguio Travel Guide? Go on a cultural journey to the museums and villages. Sample Cordilleran cuisine and other homegrown dishes. Immerse yourself in the places where the locals frequent, whether it's at the hole-in-the-wall eatery or the public market where all sorts of fresh produce can be found.</p>
            <p>Our Baguio Travel Guide has everything you need to help plan your next trip with ease: tourist spots, where to eat, hotels, and more!</p>
          `,
          footers: [
            {
              name: "Next",
              color: "danger",
              action: async () => {
                this.modalService.setModal({
                  isOpen: true,
                  header_title: "History of Baguio",
                  body_content: `
                    <p>Baguio was established as a hill station by the United States in 1900 at the site of an Ibaloi village known as Kafagway. It was the United States' only hill station in Asia. The name of the city is derived from bag-iw, the Ibaloi word for "moss".</p>
                  `,
                  footers: [
                    {
                      name: "Next",
                      color: "danger",
                      action: async () => {
                        this.modalService.setModal({
                          isOpen: true,
                          header_title: "Why you should travel to baguio?",
                          body_content: `
                            <p>Baguio City is an amalgamation of different cultures and people from all over the Philippines.</p>
                            <p>Synonymous with Baguio City is the cool climate and temperature of the place especially during the Christmas season until the month of February. </p>
                            <p>Panagbenga or the Baguio Flower Festival is an annual city wide event held every February.</p>
                            <p>When in Baguio, foods can be as refreshing as its ambiance.</p>
                            <p>For nature lovers, Baguio City is the perfect place to get away from the busy metro life. Fresh air, the smell of sweet pine scent and the awesome view of mountains.</p>
                            <p>There's just something in Baguio that when you experience and feel it you'll gonna keep on coming back and one reason could be the ambiance.</p>
                          `,
                          footers: [
                            {
                              name: "Proceed",
                              color: "danger",
                              action: async () => {
                                
                              }
                            }
                          ]
                        });
                      }
                    }
                  ]
                });
              }
            }
          ]
        });
      },
      1000
    )
  }

  private async onGoogleLoaded() {
    return new Promise(resolve => {
      let intv = setInterval(() => {
        try {
          if (google !== undefined) {
            clearInterval(intv);
            intv = undefined;
            resolve();
          }
        } catch (err) {}
      }, 1);
    });
  }

  public checkMobileDeviceReady() {
    return new Promise(resolve => {
      document.addEventListener(
        "deviceready",
        () => {
          resolve();
        },
        false
      );
    });
  }

  public async checkConnection() {
    return new Promise(
      async resolve => {
        try {
          let promise_timeout = new Promise(resolve => {
            let wait = setTimeout(() => {
              clearTimeout(wait);
              wait = undefined;
              resolve(false);
            }, 10000);
          });
          const res = await Promise.race([this.httpService.get("https://api.ipify.org?format=json").toPromise(), promise_timeout]);
          if (res === false) {
            alert("No network connection. Click Ok to restart app.");
            this.isAppReady = false;
            location.reload();
          } else {
            resolve();
          }
        } catch (err) {
          alert("No network connection. Click Ok to restart app.");
          this.isAppReady = false;
          location.reload();
        }
      }
    )
  }

  private async setStorage() {
    let foods = await this.storageService.get("foods");
    let restaurants = await this.storageService.get("restaurants");
    let tourist_spots = await this.storageService.get("tourist_spots");
    let police_stations = await this.storageService.get("police_stations");
    let transients = await this.storageService.get("transients");
    let hotels = await this.storageService.get("hotels");
    let ghost = await this.storageService.get("ghost");
    let souvenirs = await this.storageService.get("souvenirs");
    let souvenir_stores = await this.storageService.get("souvenir_stores");
    if (foods === null) {
      foods = await this.httpService
        .get("assets/data/foods.json")
        .toPromise();
      await this.storageService.set(
        "foods",
        JSON.stringify(foods)
      );
    }
    if (restaurants === null) {
      restaurants = await this.httpService
        .get("assets/data/restaurants.json")
        .toPromise();
      await this.storageService.set(
        "restaurants",
        JSON.stringify(restaurants)
      );
    }
    if (tourist_spots === null) {
      tourist_spots = await this.httpService
        .get("assets/data/tourist_spots.json")
        .toPromise();
      await this.storageService.set(
        "tourist_spots",
        JSON.stringify(tourist_spots)
      );
    }
    if (hotels === null) {
      hotels = await this.httpService
        .get("assets/data/hotels.json")
        .toPromise();
      await this.storageService.set(
        "hotels",
        JSON.stringify(hotels)
      );
    }
    if (police_stations === null) {
      police_stations = await this.httpService
        .get("assets/data/police_stations.json")
        .toPromise();
      await this.storageService.set(
        "police_stations",
        JSON.stringify(police_stations)
      );
    }
    if (transients === null) {
      transients = await this.httpService
        .get("assets/data/transients.json")
        .toPromise();
      await this.storageService.set(
        "transients",
        JSON.stringify(transients)
      );
    }
    if (ghost === null) {
      ghost = await this.httpService
        .get("assets/data/ghost.json")
        .toPromise();
      await this.storageService.set(
        "ghost",
        JSON.stringify(ghost)
      );
    }
    if (souvenir_stores === null) {
      souvenir_stores = await this.httpService
        .get("assets/data/souvenir_stores.json")
        .toPromise();
      await this.storageService.set(
        "souvenir-stores",
        JSON.stringify(souvenir_stores)
      );
    }
    if (souvenirs === null) {
      souvenirs = await this.httpService
        .get("assets/data/souvenirs.json")
        .toPromise();
      await this.storageService.set(
        "souvenirs",
        JSON.stringify(souvenirs)
      );
    }
  }
}
