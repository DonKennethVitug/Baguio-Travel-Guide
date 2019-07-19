/*
 * File: main.service.module.ts
 * Project: baguio-travel-guide
 * Author: Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * Description:
 * Copyright 2018 - Procryptix LLC
 */

import { HttpClientModule } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { Config } from "../models";
import { StorageService } from "./shared.services/storage.service";
import { fakeBackendProvider } from "./shared.services/mock.service";
import { HttpService } from "./shared.services/http.service";
import { ModalService } from './shared.services/modal.service';
import { RouteService } from './shared.services/route.service';
import { LoadingService } from './shared.services/loading.service';
import { LocationService } from './shared.services/location.service';
import { GeolocationService } from './shared.services/geolocation.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [],
})
export class ResidentRoundsServicesModule {
  public static forRoot(_Config: Config): ModuleWithProviders {
    return {
      ngModule: ResidentRoundsServicesModule,
      providers: [
        {
          provide: Config,
          useValue: _Config,
        },
        StorageService,
        HttpService,
        fakeBackendProvider,
        ModalService,
        RouteService,
        LoadingService,
        LocationService,
        GeolocationService
      ],
    };
  }
}

export { StorageService } from "./shared.services/storage.service";
export { HttpService } from "./shared.services/http.service";
export { ModalService } from './shared.services/modal.service';
export { RouteService } from './shared.services/route.service';
export { LoadingService } from './shared.services/loading.service';
export { LocationService } from './shared.services/location.service';
export { GeolocationService } from './shared.services/geolocation.service';
