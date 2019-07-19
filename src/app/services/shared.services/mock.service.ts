import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable()
export class MockService implements HttpInterceptor {
  constructor(
    private readonly httpService: HttpService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            if (request.url.endsWith("/patients") && request.method === "GET") {
              return of(new HttpResponse({ 
                status: 200,
                body: [],
              }));
            }
            if (request.url.endsWith("/patient_registration_data") && request.method === "GET") {
              const patient_registration_data = this.httpService.get('assets/data/patient-registration-data.json').toPromise();
              return of(new HttpResponse({ 
                status: 200,
                body: patient_registration_data,
              }));
            }
            return next.handle(request);
          }),
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockService,
  multi: true,
};
