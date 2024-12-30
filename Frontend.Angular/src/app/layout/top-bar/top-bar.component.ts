import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {SideMenuButtonComponent} from '../side-menu/side-menu-button/side-menu-button.component';
import {HomeButtonComponent} from './home-button/home-button.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TopBarPanelComponent} from './top-bar-panel/top-bar-panel.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-top-bar',
  template: `
    <div class="container">
      @if (getPermission() | async; as permission) {
        <div class="left">
          <app-side-menu-button/>
          <app-home-button class="home-button"/>
        </div>
        <div class="center">
          <app-top-menu class="menu"/>
        </div>
        <div class="right">
          <app-top-bar-panel/>
        </div>
      }
    </div>
    <div class="subline"></div>
  `,
  styles: `
    .container {
      padding: 0 0.5em;
      background-color: var(--background-card);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 100%;

      /* grid-auto-columns: 1fr; */
      align-items: stretch;
      min-height: 48px;
    }

    .left {
      height: 100%;
      display: grid;
      justify-content: flex-start;
      align-items: center;
      grid-auto-columns: max-content;
      grid-template-rows: 1fr;
      grid-auto-flow: column;
    }

    .center {
      display: grid;
      justify-content: center;

      & .menu {
        @media (width <= 650px) {
          display: none;
        }
      }
    }

    .home-button {
      height: 100%;
    }

    .right {
    }

    .subline {
      /* width: 100vw; */
      border-bottom: 0.1em solid var(--primary-default);
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SideMenuButtonComponent, HomeButtonComponent, TopMenuComponent, TopBarPanelComponent, AsyncPipe]
})
export class TopBarComponent {
  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.isPublic();
}
