import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-button',
  template: `
    <a [routerLink]="['/' + lang() + '/']" color="basic" class="home-button" mat-stroked-button>
      <img [src]="'assets/img/logo.svg'" alt="logo">
    </a>

  `,
  styles: `
    .home-button {
      height: 100%;
      border: none;
      border-radius: 0;
      margin: 0 0.5em;
    }

    ::ng-deep .mdc-button__label {
      display: flex;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatAnchor, RouterLink],
})
export class HomeButtonComponent {
  private readonly localeHost = inject(LocaleHost);
  public lang = this.localeHost.language;
}
