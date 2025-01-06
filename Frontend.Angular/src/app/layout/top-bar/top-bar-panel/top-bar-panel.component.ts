import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {SliderComponent} from '@common/components/slider/slider.component';
import {LanguageButtonComponent} from '@common/lang-system/language-button/language-button.component';
import {SignIoButtonComponent} from '@common/permission-system/sign-io-button/sign-io-button.component';
import {ThemeSwitcherComponent} from '@common/theming/components/theme-switcher/theme-switcher.component';
import {
  MessageHistoryButtonComponent
} from "@app/layout/top-bar/top-bar-panel/message-history-button/message-history-button.component";

@Component({
  selector: 'app-top-bar-panel',
  template: `
    <div class="container">
      <div class="buttons">
        <ng-container *ngTemplateOutlet="buttons; context: { $implicit: true }"/>
      </div>
    </div>
    <div class="container-mobile">
      <div class="menu-vert-container">
        <button mat-icon-button (click)="onOpenSlider()">
          <mat-icon>more_vert</mat-icon>
        </button>
        <app-slider [direction]="'top'" [opened]="opened()">
          <div class="menu">
            <ng-container *ngTemplateOutlet="buttons; context: { $implicit: false }"/>
          </div>
        </app-slider>
      </div>
    </div>

    <ng-template let-horizontal #buttons>
      <app-language-button [horizontal]="horizontal"/>
      <app-sign-io-button [horizontal]="horizontal"/>
      <app-theme-switcher/>
      <app-message-history-button/>
    </ng-template>

  `,
  styles: `
    .container {
      height: 100%;
    }

    .icon-button {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
    }

    .icon-button > * {
      margin: 0;
      padding: 0;
    }

    .container-mobile {
      display: none;
    }

    .buttons {
      height: 100%;

      display: grid;
      justify-content: flex-end;
      align-items: center;
      grid-auto-columns: max-content;
      grid-auto-flow: column;
      gap: 0.4em;
    }

    ::ng-deep .cdk-overlay-pane > .mat-mdc-menu-panel {
      min-width: 80px;
    }

    /* .menu{
        min-width: 50px;
    } */
    @media (width <= 650px) {
      .container {
        display: none;
      }

      .container-mobile {
        display: block;
        height: 100%;
      }

      .menu-vert-container {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr min-content;
        align-items: center;
      }

      .menu-vert-container > button {
        justify-self: flex-end;
      }

      .menu {
        --border: 1px solid var(--primary-default);

        background-color: var(--background-card);
        border-left: var(--border);
        border-right: var(--border);
        border-bottom: var(--border);
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
      }
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, MatIconButton, MatIcon, SliderComponent, LanguageButtonComponent, SignIoButtonComponent, ThemeSwitcherComponent, MessageHistoryButtonComponent]
})
export class TopBarPanelComponent {
  public readonly opened = signal(false);

  public onOpenSlider() {
    this.opened.set(!this.opened());
  }
}
