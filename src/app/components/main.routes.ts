import { Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { BaguioMapComponent } from './baguio-map/baguio-map.component';
import { TouristSpotsComponent } from './tourist-spots/tourist-spots.component';
import { PoliceStationsComponent } from './police-stations/police-stations.component';
import { FoodsDetailsComponent } from './foods-details/foods-details.component';
import { SouvenirStoresDetailsComponent } from './souvenir-stores-details/souvenir-stores-details.component';
import { HotelsDetailsComponent } from './hotels-details/hotels-details.component';
import { TouristSpotsDetailsComponent } from './tourist-spots-details/tourist-spots-details.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsDetailsComponent } from './restaurants-details/restaurants-details.component';
import { SouvenirStoresComponent } from './souvenir-stores/souvenir-stores.component';
import { FoodsComponent } from './foods/foods.component';
import { HotelsComponent } from './hotels/hotels.component';
import { PoliceStationsDetailsComponent } from './police-stations-details/police-stations-details.component';
import { TransientsComponent } from './transients/transients.component';
import { TransientsDetailsComponent } from './transients-details/transients-details.component';
import { GhostStoriesComponent } from './ghost-stories/ghost-stories.component';
import { GhostStoriesDetailsComponent } from './ghost-stories-details/ghost-stories-details.component';
import { SouvenirsDetailsComponent } from './souvenirs-details/souvenirs-details.component';
import { SouvenirsComponent } from './souvenirs/souvenirs.component';

export const MainRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "baguio-map",
    component: BaguioMapComponent,
  },
  {
    path: "ghost-stories",
    component: GhostStoriesComponent,
  },
  {
    path: "souvenirs",
    component: SouvenirsComponent,
  },
  {
    path: "tourist-spots",
    component: TouristSpotsComponent,
  },
  {
    path: "foods",
    component: FoodsComponent,
  },
  {
    path: "restaurants",
    component: RestaurantsComponent,
  },
  {
    path: "hotels",
    component: HotelsComponent,
  },
  {
    path: "transients",
    component: TransientsComponent,
  },
  {
    path: "souvenir-stores",
    component: SouvenirStoresComponent,
  },
  {
    path: "police-stations",
    component: PoliceStationsComponent,
  },
  {
    path: "police-stations-details/:place_id",
    component: PoliceStationsDetailsComponent,
  },
  {
    path: "tourist-spots-details/:place_id",
    component: TouristSpotsDetailsComponent,
  },
  {
    path: "hotels-details/:name",
    component: HotelsDetailsComponent,
  },
  {
    path: "transients-details/:name",
    component: TransientsDetailsComponent,
  },
  {
    path: "souvenir-stores-details/:place_id",
    component: SouvenirStoresDetailsComponent,
  },
  {
    path: "ghost-stories-details/:name",
    component: GhostStoriesDetailsComponent,
  },
  {
    path: "foods-details/:id",
    component: FoodsDetailsComponent,
  },
  {
    path: "souvenirs-details/:name",
    component: SouvenirsDetailsComponent,
  },
  {
    path: "restaurant-details/:place_id",
    component: RestaurantsDetailsComponent,
  },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "",
  },
];
