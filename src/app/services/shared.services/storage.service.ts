import { Injectable } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

@Injectable()
export class StorageService {
  constructor(protected localStorage: LocalStorage) {}

  public async set(name: string, item: any): Promise<any> {
    return new Promise((resolve) => {
      this.localStorage.setItem(name, item).subscribe(() => {
        resolve();
      });
    });
  }

  public async get(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.localStorage.getItem(name).subscribe((item: any) => {
        resolve(item);
      });
    });
  }

  public async remove(name: string): Promise<any> {
    return new Promise((resolve) => {
      this.localStorage.removeItem(name).subscribe(() => {
        resolve();
      });
    });
  }

  public async clear(): Promise<any> {
    return new Promise((resolve) => {
      this.localStorage.clear().subscribe(() => {
        resolve();
      });
    });
  }
}
