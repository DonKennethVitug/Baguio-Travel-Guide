import { Injectable } from "@angular/core";
import { Loading } from "src/app/models";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {

  /**
   * Used to store loadingValue
   * 
   * @name loadingValue
   * @public
   * @type {Loading}
   * @memberof LoadingService
   */
  public loadingValue: Loading = new Loading();

  /**
   * Used to store loading
   * 
   * @name loading
   * @private
   * @type {BehaviorSubject<Loading>}
   * @memberof LoadingService
   */
  private loading: BehaviorSubject<Loading> = new BehaviorSubject<Loading>(this.loadingValue);

  /**
   * Used to store percentage
   * 
   * @name percentage
   * @private
   * @type {number}
   * @memberof LoadingService
   */
  private percentage: number;

  /**
   * Used to store finish
   * 
   * @name finish
   * @private
   * @type {boolean}
   * @memberof LoadingService
   */
  private finish: boolean;

  /**
   * Used to store query
   * 
   * @name query
   * @private
   * @type {string[]}
   * @memberof LoadingService
   */
  private query: string[] = new Array();

  /**
   * Used to store interval
   * 
   * @name interval
   * @private
   * @type {any}
   * @memberof LoadingService
   */
  private interval: any;

  /**
   * Creates an instance of LoadingService.
   * 
   * @constructor
   * @param {HttpService} httpService 
   * @memberof LoadingService
   */
  constructor() {
    this.percentage = 0;
  }

  /**
   * Used to get loading observable
   * 
   * @method isLoading
   * @public
   * @returns {Observable<Loading>} 
   * @memberof LoadingService
   */
  public isLoading(): Observable<Loading> {
    return this.loading.asObservable();
  }

  /**
   * Used to set Loading Value
   * 
   * @method setLoadingValue
   * @public
   * @param {{isLoading: boolean, msg: string}} loading 
   * @memberof LoadingService
   */
  public setLoadingValue(loading: Loading): void {
    this.loadingValue = {
      isLoading: loading.isLoading,
      msg: loading.msg,
      percentage: this.percentage + "%"
    };
    if (!loading.isLoading) {
      this.loadingValue.isLoading = true;
      const query = new Array();
      for (const i in this.query) {
        if (this.query[i] !== this.loadingValue.msg) {
          query.push(this.query[i]);
        }
      }
      this.query = query;
      if (this.query[0] !== undefined) {
        this.loadingValue.msg = this.query[0];
        this.loading.next(this.loadingValue);
      }
      setTimeout(
        () => {
          if (Object.keys(this.query).length === 0) {
            this.loadingValue.percentage = "100%";
            this.loading.next(this.loadingValue);
            setTimeout(
              () => { 
                this.percentage = 0; 
                this.loadingValue.isLoading = false;
                this.loading.next(this.loadingValue);
              }, 100
            );
          }
        }, 1
      );
    } else {
      this.query.push(loading.msg);
      if (Object.keys(this.query).length === 1 && this.interval === undefined) {
        this.setLoadingPercentage();
      }
      this.loading.next(this.loadingValue);
    }
  }

  /**
   * Used to set loading perecentage
   * 
   * @method setLoadingPercentage
   * @private
   * @memberof LoadingService
   */
  private setLoadingPercentage(): void {
    this.interval = setInterval(
      () => { 
        if (this.loadingValue.percentage === "100%") {
          clearInterval(this.interval);
          this.interval = undefined;
        } else if (this.percentage < 50) {
          this.percentage = this.percentage + 10;
          this.loadingValue.percentage = this.percentage + "%";
          this.loading.next(this.loadingValue);
        } else if (this.percentage < 75) {
          this.percentage = this.percentage + 5;
          this.loadingValue.percentage = this.percentage + "%";
          this.loading.next(this.loadingValue);
        } else if (this.percentage < 95) {
          this.percentage = this.percentage + 2;
          this.loadingValue.percentage = this.percentage + "%";
          this.loading.next(this.loadingValue);
        }
    }, 1000);
  }

  public showLoading(msg = "Loading") {
    this.setLoadingValue({
      isLoading: true,
      msg
    });
  }

  public hideLoading(msg = "Loading") {
    this.setLoadingValue({
      isLoading: false,
      msg
    });
  }

}
