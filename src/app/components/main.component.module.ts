import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { localStorageProviders } from "@ngx-pwa/local-storage";
import { ModalModule, BsDropdownModule } from "ngx-bootstrap";
import { WebStorageModule } from "ngx-store";
import { AppConfig } from "../app.config";
import { MainComponent } from "./main.component";
import { MainRoutes } from "./main.routes";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { BotNavComponent } from './shared/bot-nav/bot-nav.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { BaguioMapComponent } from './baguio-map/baguio-map.component';
import { TouristSpotsComponent } from './tourist-spots/tourist-spots.component';
import { PoliceStationsComponent } from './police-stations/police-stations.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { BaguioMapModalComponent } from './baguio-map/baguio-map-modal/baguio-map-modal.component';
import { SouvenirStoresComponent } from './souvenir-stores/souvenir-stores.component';
import { HotelsComponent } from './hotels/hotels.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodsDetailsComponent } from './foods-details/foods-details.component';
import { HotelsDetailsComponent } from './hotels-details/hotels-details.component';
import { SouvenirStoresDetailsComponent } from './souvenir-stores-details/souvenir-stores-details.component';
import { TouristSpotsDetailsComponent } from './tourist-spots-details/tourist-spots-details.component';
import { RestaurantsDetailsComponent } from './restaurants-details/restaurants-details.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { PoliceStationsDetailsComponent } from './police-stations-details/police-stations-details.component';
import { HotelsModalComponent } from './hotels/hotels-modal/hotels-modal.component';
import { TransientsComponent } from './transients/transients.component';
import { TransientsDetailsComponent } from './transients-details/transients-details.component';
import { GhostStoriesComponent } from './ghost-stories/ghost-stories.component';
import { GhostStoriesDetailsComponent } from './ghost-stories-details/ghost-stories-details.component';
import { SouvenirsComponent } from './souvenirs/souvenirs.component';
import { SouvenirsDetailsComponent } from './souvenirs-details/souvenirs-details.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    BotNavComponent,
    HomeComponent,
    ModalComponent,
    LoadingComponent,
    BaguioMapComponent,
    TouristSpotsComponent,
    PoliceStationsComponent,
    BaguioMapModalComponent,
    SouvenirStoresComponent,
    HotelsComponent,
    FoodsComponent,
    FoodsDetailsComponent,
    HotelsDetailsComponent,
    SouvenirStoresDetailsComponent,
    TouristSpotsDetailsComponent,
    RestaurantsDetailsComponent,
    RestaurantsComponent,
    PoliceStationsDetailsComponent,
    HotelsModalComponent,
    TransientsComponent,
    TransientsDetailsComponent,
    GhostStoriesComponent,
    GhostStoriesDetailsComponent,
    SouvenirsComponent,
    SouvenirsDetailsComponent
  ],
  imports: [
    BrowserModule,
    WebStorageModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    OrderModule,
    GooglePlaceModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(MainRoutes, {
      useHash: true,
    }),
  ],
  entryComponents: [],
})
export class ResidentRoundsComponentsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ResidentRoundsComponentsModule,
      providers: [localStorageProviders({ prefix: AppConfig.production ? "ResidentRounds" : "ResidentRoundsDev" })],
    };
  }
}

export { MainComponent } from "./main.component";
