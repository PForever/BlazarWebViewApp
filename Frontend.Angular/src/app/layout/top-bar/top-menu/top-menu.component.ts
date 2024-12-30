import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MenuService} from '@app/layout/side-menu/services/MenuServices';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-menu',
  template: `
    <div class="container">
      @for (item of items | async; track item.url) {
        <div class="menu-item">
          <button color="basic" [routerLink]="['/' + lang() + '/' + item.url]" mat-stroked-button>
            <span class="menu-text">{{ item.title }}</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .container {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: stretch;
    }

    .menu-text {
      color: var(--foreground-icon);
    }

    .menu-item {
      & > button {
        height: 100%;
        border: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, RouterLink, AsyncPipe]
})
export class TopMenuComponent {
  private readonly menuService = inject(MenuService);
  public readonly items = this.menuService.items;
  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
