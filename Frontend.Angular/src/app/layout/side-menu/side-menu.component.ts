import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {SideMenuService} from './services/SideMenuService';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {MenuService} from './services/MenuServices';
import {AsyncPipe, NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  template: `
    <div class="container">
      <div class="slider" [ngClass]="sideMenuService.opened ? 'slider-opened' : 'slider-closed'">
        <div class="menu-container">
          @for (item of items | async; track item.url) {
            <button color="basic" [routerLink]="['/' + lang() + '/' + item.url]" mat-stroked-button>
              <span class="menu-text">{{ item.title }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      height: 100%;
      position: fixed;
      z-index: 1000;
    }

    .menu-container {
      padding: 0.5em 0;
      height: 100%;
      min-width: 200px;
      /* background-color: var(--background-app-bar); */

      /* opacity: 85%; */
      backdrop-filter: blur(10px);
      border-right: 1px solid var(--foreground-icon);
      display: grid;
      grid-auto-rows: max-content;
    }

    .menu-container > button {
      border: none;
    }

    .menu-text {
      color: var(--foreground-icon);
    }

    .slider {
      position: absolute;
      height: 100%;
      overflow: hidden;
      z-index: 1000;
      transition: transform 0.3s ease-in;
    }

    .slider-closed {
      transform: translateX(-100%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, MatButton, RouterLink, AsyncPipe]
})
export class SideMenuComponent {
  private readonly menuService = inject(MenuService);
  public readonly items = this.menuService.items;

  public constructor(public readonly sideMenuService: SideMenuService) {
  }

  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
}
