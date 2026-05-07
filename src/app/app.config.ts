import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

// import { provideAnimations, provideNoopAnimations} from'@angular/platform-browser/animations'


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authHeaderInterceptor } from './core/interceptors/auth-header-interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      withComponentInputBinding(),
      withInMemoryScrolling({scrollPositionRestoration: 'enabled'})
    ),
    
    provideHttpClient(
      withInterceptors([authHeaderInterceptor]) // ترتيبهم هنا مش هيفرق كتير
    ),
    
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    // provideNoopAnimations()
  ]
};
