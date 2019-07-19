import { Component, OnInit } from '@angular/core';

declare const navigator: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  exit() {
    let isCordovaApp =
      document.URL.indexOf("http://") === -1 &&
      document.URL.indexOf("https://") === -1;
    if (isCordovaApp) {
      const userData = {
        field: "kerekesfacapa"
      };
      navigator.app.exitApp();
    } else {
      location.reload();
    }
  }

}
