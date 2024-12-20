import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { GraphQLModule } from './shared/graphql.module';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideNoopAnimations(),
    //GraphQLModule,
    importProvidersFrom(GraphQLModule)
  ]
};
