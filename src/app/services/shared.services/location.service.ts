import { Injectable, Inject } from "@angular/core";
import { GeolocationService } from './geolocation.service';
import { ModalService } from './modal.service';
import { Config } from 'src/app/models';

@Injectable()
export class LocationService {

  public location = {
    latitude: 16.4023,
    longitude: 120.5960,
    address: "Baguio, Benguet, Philippines"
  };

  constructor(
    private readonly geolocationService: GeolocationService,
    private readonly modalService: ModalService,
    @Inject(Config) private readonly config: Config
  ) {}

  public async findMe() {
    const opts = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000
    };
    const location = await this.geolocationService.getGeoLocation(opts);
    if (
      location.coords.latitude === 16.4023 &&
      location.coords.longitude === 120.596
    ) {
      if (this.config.production) {
        this.modalService.setModal({
          isOpen: true,
          header_title: "Warning!",
          body_content: `
            <p>Error tracking your current location.</p>
            <p>Please check if your mobile location is enabled.</p>
          `,
          footers: [
            {
              name: "Ok",
              color: "danger",
              action: async () => {}
            }
          ]
        });
      }
    }
    this.location = location.coords;
    return this.location;
  }

}
