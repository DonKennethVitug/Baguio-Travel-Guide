/*
 * File: app.module.ts
 * Project: baguio-travel-guide
 * Author: Matthew Aaron Raymer <matthew.raymer@anomalistdesign.com>
 * Description:
 * Copyright 2018 - Procryptix LLC
 */

import { NgModule } from "@angular/core";
import { AppConfig } from "./app.config";
import {
  MainComponent,
  ResidentRoundsComponentsModule,
} from "./components/main.component.module";
import { ResidentRoundsServicesModule } from "./services/main.service.module";

@NgModule({
  imports: [
    ResidentRoundsServicesModule.forRoot(AppConfig),
    ResidentRoundsComponentsModule.forRoot(),
  ],
  bootstrap: [MainComponent],
  declarations: [],
})
export class AppModule {}
