import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class RouteService {

  public currentStateValue = "/";

  constructor(
    private readonly router: Router
  ) {}

  private readonly currentState: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(this.currentStateValue);

  public getCurrentState(): Observable<any> {
    return this.currentState.asObservable();
  }

  public async setCurrentState(currentState: string) {
    this.currentStateValue = currentState;
    await this.currentState.next(currentState);
  }

  public async startStateListener() {
    const urls = this.router.routerState.snapshot.url.split("/");
    if (urls[1] !== undefined) {
      urls[1] = (urls[1].split("#"))[0];
    } else {
      urls[1] = "";
    }
    this.setCurrentState("/" + urls[1]);
    await this.router.events.subscribe(async (evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      const urls = evt.url.split("/");
      if (urls[1] !== undefined) {
        urls[1] = (urls[1].split("#"))[0];
      } else {
        urls[1] = "";
      }
      await this.setCurrentState("/" + urls[1]);
      setTimeout(
        () => {
          window.scrollTo(0, 0);
        },
        1,
      );
    });
  }

}
