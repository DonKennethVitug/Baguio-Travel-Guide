import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { AppConfig } from './app/app.config';

if (AppConfig.production) {
  enableProdMode();
  window.console.log = () => {};
  window.console.error = () => {};
  window.console.debug = () => {};
  window.console.info = () => {};
  window.console.warn = () => {};
  window.console.info = () => {};
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: true
  })
  .catch(err => console.error(err));
