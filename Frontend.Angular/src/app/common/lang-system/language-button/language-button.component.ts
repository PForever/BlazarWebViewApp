import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TextHost} from '../TextHost';
import {LocaleHost} from '../LocaleHost';
import {RouteService} from '../../routes/RouteService';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-language-button',
  template: `
    <div class="container">
      @if (horizontal()) {
        <button class="panel-button horizontal" mat-stroked-button extended color="basic" [matMenuTriggerFor]="menu">
          <mat-icon>language</mat-icon>
          <span class="main-text">{{ lang() | uppercase }}</span>
        </button>
      } @else {
        <button class="panel-button vartical" mat-stroked-button extended color="basic" [matMenuTriggerFor]="menu">
          <mat-icon>language</mat-icon>
          <span class="main-text">{{ lang() | uppercase }}</span>
        </button>
      }
      <mat-menu #menu="matMenu">
        @if (fullPath | async; as currentUrl) {
          <div>
            @for (newLang of languages; track newLang) {
              <div>
                <button color="basic" mat-menu-item (click)="changeLanguage(lang(), newLang, currentUrl)">
                  <mat-icon>language</mat-icon>
                  <span>{{ newLang | uppercase }}</span>
                </button>
              </div>
            }
          </div>
        }
      </mat-menu>
    </div>
  `,
  styles: `
    .container {
      color: var(--foreground-icon);
    }

    .panel-button {
      border: none;
    }

    .horizontal {
      border-radius: 5em;
    }

    .vartical {
      /* border-radius: 0; */
      width: 100%;
    }

    ::ng-deep button[color="basic"] > span, button[color="basic"] > mat-icon {
      color: var(--foreground-icon);
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem, AsyncPipe, UpperCasePipe]
})
export class LanguageButtonComponent {
  public readonly horizontal = input(true);
  public readonly languages = TextHost.SupportedLanguages;
  public readonly fullPath: Observable<string>;
  public readonly lang = this.localeHost.language;

  public changeLanguage(currentLanguage: string, newLanguage: string, url: string) {
    const newUrl = url.replace(new RegExp(`/${currentLanguage}(/|$)`, "ig"), `/${newLanguage}/`);
    this.router.navigateByUrl(newUrl);
  }

  public constructor(
    public localeHost: LocaleHost,
    private readonly router: Router,
    routeService: RouteService) {
    this.fullPath = routeService.getFullPath();
  }
}
