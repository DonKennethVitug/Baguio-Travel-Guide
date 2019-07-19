import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-baguio-map-modal',
  templateUrl: './baguio-map-modal.component.html',
  styleUrls: ['./baguio-map-modal.component.css']
})
export class BaguioMapModalComponent implements OnInit {

  @ViewChild("modalDirective")
  public modalDirective: ModalDirective;
  @Output()
  public onFilter = new EventEmitter<any>();
  public filters = [
    {
      name: "Tourist Spots",
      method: "setTouristSpots",
      active: true
    },
    {
      name: "Hotels",
      method: "setHotels",
      active: true
    },
    {
      name: "Transients",
      method: "setTransients",
      active: true
    },
    {
      name: "Restaurants",
      method: "setRestaurants",
      active: true
    },
    {
      name: "Police Stations",
      method: "setPoliceStations",
      active: true
    },
    {
      name: "Souvenir Stores",
      method: "setSouvenirs",
      active: true
    }
  ];

  constructor(
  ) {}
  private clickReady = false;

  public ngOnInit() {}

  public async show() {
    this.modalDirective.show();
  }

  public async filter() {
    this.onFilter.emit(this.filters);
  }

}
