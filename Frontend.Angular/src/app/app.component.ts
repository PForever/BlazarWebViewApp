import {Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    template: `
    @if (getPermission() | async; as permission) {
      <section class="layout">
        <header class="header">
          <app-top-bar/>
        </header>
        <nav class="side-menu">
          <app-side-menu/>
        </nav>
        <main class="main-body">
          <app-main/>
        </main>
        <footer class="footer">
          <app-footer/>
        </footer>
      </section>
    }

  `,
    styles: `
    :host {
      --header-offset: 4em;
    }

    .layout {
      display: grid;
      width: 100%;
      height: fit-content;
      min-height: 100%;
      grid-template:
    "head head" var(--header-offset)
    "nav  main" 1fr
    "nav  foot" fit-content(3em)
    / fit-content(10%) 1fr;
    }

    .header {
      position: sticky;
      top: 0;
      z-index: 1000;

      /* background-color: var(--theme-color-hieght); */
      background-color: var(--primary-default);
      grid-area: head;
    }

    .side-menu {
      grid-area: nav;
    }

    .main-body {
      grid-area: main;
    }

    .footer {
      grid-area: foot;
    }
  `,
    imports: [TopBarComponent, SideMenuComponent, MainComponent, FooterComponent, AsyncPipe]
})
export class AppComponent {
  public constructor() {
    //to fix lazy build additional css for routes in ssr
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.isPublic();
}
