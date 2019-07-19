import { Injectable, Inject } from "@angular/core";
import { Config } from "src/app/models";

const GEOLOCATION_ERRORS = {
  "errors.location.unsupportedBrowser": {
    code: 1,
    message: "Browser does not support location services"
  },
  "errors.location.permissionDenied": {
    code: 2,
    message: "You have rejected access to your location"
  },
  "errors.location.positionUnavailable": {
    code: 3,
    message: "Unable to determine your location"
  },
  "errors.location.timeout": {
    code: 4,
    message: "Service timeout has been reached"
  },
  "errors.ui.timeout": {
    code: 5,
    message: "User Interaction timeout has been reached"
  }
};

@Injectable()
export class GeolocationService {
  constructor(@Inject(Config) private readonly config: Config) {}

  public getGeoLocation(opts: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let isFinish = false;
      let tmt = setTimeout(() => {
        if (!isFinish) {
          reject(GEOLOCATION_ERRORS["errors.location.timeout"]);
        }
      }, opts.timeout + 500);
      if (!this.config.production) {
        const pos: any = {
          coords: {
            latitude: 16.4023,
            longitude: 120.596
          }
        };
        isFinish = true;
        clearTimeout(tmt);
        tmt = undefined;
        resolve(pos);
      } else {
        if (navigator && navigator.geolocation) {
          const onGetCurrentPositionSuccess = (position: any) => {
            const pos: any = {
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
            isFinish = true;
            clearTimeout(tmt);
            tmt = undefined;
            resolve(pos);
          };
          const onGetCurrentPositionError = (error: any) => {
            isFinish = true;
            switch (error.code) {
              case 1:
                resolve({
                  coords: {
                    latitude: 16.4023,
                    longitude: 120.596
                  }
                });
                break;
              case 2:
                resolve({
                  coords: {
                    latitude: 16.4023,
                    longitude: 120.596
                  }
                });
                break;
              case 3:
                resolve({
                  coords: {
                    latitude: 16.4023,
                    longitude: 120.596
                  }
                });
            }
          };
          navigator.geolocation.getCurrentPosition(
            onGetCurrentPositionSuccess,
            onGetCurrentPositionError,
            opts
          );
        } else {
          isFinish = true;
          resolve({
            coords: {
              latitude: 16.4023,
              longitude: 120.596
            }
          });
        }
      }
    });
  }
}
