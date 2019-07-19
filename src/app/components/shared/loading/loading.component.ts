import { Component, OnInit } from "@angular/core";
import { Loading } from "src/app/models";
import { LoadingService } from "src/app/services/main.service.module";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"]
})
export class LoadingComponent implements OnInit {

  /**
   * Used to store loading
   * 
   * @name loading
   * @public
   * @type {Loading}
   * @memberof LoadingComponent
   */
  public loading: Loading = new Loading();

  /**
   * Creates an instance of LoadingComponent.
   * 
   * @constructor
   * @param {LoadingService} loadingService 
   * @memberof LoadingComponent
   */
  constructor(
    private loadingService: LoadingService
  ) { }
  
  /**
   * Initializes Loader Component
   * 
   * @method ngOnInit
   * @public
   * @memberof LoadingComponent
   */
  public ngOnInit() {
    this.loadingService.isLoading().subscribe(
      (loading: Loading) => {
        this.loading = loading;
      }
    );
  }

}
