import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-hotels-modal',
  templateUrl: './hotels-modal.component.html',
  styleUrls: ['./hotels-modal.component.css']
})
export class HotelsModalComponent implements OnInit {

  @ViewChild("modalDirective")
  public modalDirective: ModalDirective;
  @Output()
  public onFilter = new EventEmitter<any>();
  public filters = [
    {
      name: "2 star Hotels",
      method: "2",
      active: true
    },
    {
      name: "3 star Hotels",
      method: "3",
      active: true
    },
    {
      name: "4 star Hotels",
      method: "4",
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
