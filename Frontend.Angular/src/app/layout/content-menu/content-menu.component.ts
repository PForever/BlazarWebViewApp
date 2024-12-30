import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ContentMenuItems} from "@app/layout/content-menu/content-menu.items";
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-content-menu',
    template: `
    <div class="container">
      <div class="box">
        @for (item of items(); track item.id) {
          <button class="menu-item" color="basic" [routerLink]="'.'" [fragment]="item.id" mat-stroked-button>
            <span>{{ item.title }}</span>
          </button>
        }
      </div>
    </div>

  `,
    styles: `
    @import url("assets/styles/buttons.css");

    .container {
      position: sticky;
      top: calc(var(--header-offset));
      max-height: calc(100vh - var(--header-offset));
      height: 100%;
      width: 30em;
      padding-right: 3em;
      overflow: hidden;
    }

    .box {
      height: 100%;
      background: var(--background-card);
      box-shadow: 2px 0 20px 0 var(--background-tooltip);
      border-right: 1px solid var(--primary-default);
      display: flex;
      flex-direction: column;
      padding: 3em 0;
    }

  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButton, RouterLink]
})
export class ContentMenuComponent {
  public readonly items = input.required<ContentMenuItems[]>();
}
