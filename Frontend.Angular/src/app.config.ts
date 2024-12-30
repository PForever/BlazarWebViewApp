import {ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection} from "@angular/core";
import {provideRouter, RouterOutlet} from "@angular/router";
import {rootRoute} from "@common/routes/root-route";
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration
} from "@angular/platform-browser";
import {CommonModule, DatePipe, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule,
      CommonModule,
      FormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatMenuModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatDialogModule,
      ReactiveFormsModule,
      RouterOutlet,
      NgOptimizedImage),
    DatePipe,
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(rootRoute),
    provideClientHydration(),
    provideAnimations(),
    provideRouter(rootRoute),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ]
};
