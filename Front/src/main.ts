import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Proveedor para habilitar HttpClient
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
