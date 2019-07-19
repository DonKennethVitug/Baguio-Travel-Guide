import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/main.service.module';

declare const navigator: any;

@Component({
  selector: 'app-bot-nav',
  templateUrl: './bot-nav.component.html',
  styleUrls: ['./bot-nav.component.css']
})
export class BotNavComponent implements OnInit {

  constructor(
    public readonly routeService: RouteService,
  ) { }

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
