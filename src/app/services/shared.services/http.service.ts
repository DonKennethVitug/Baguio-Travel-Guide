import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  public post(url: string, data: any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(url, body, {
      headers,
    });
  }
}
