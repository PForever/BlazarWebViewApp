import {Component, inject} from '@angular/core';
import {PermissionService} from '@common/permission-system/UserService';
import {TopBarComponent} from './layout/top-bar/top-bar.component';
import {SideMenuComponent} from './layout/side-menu/side-menu.component';
import {MainComponent} from './layout/main/main.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AsyncPipe} from '@angular/common';
import {EventMessageQueueComponent} from "@app/layout/event-message-queue/event-message-queue.component";
import {SystemLogInterceptor} from "@common/help/services/system-log-intersepter.service";
import {KeyboardService} from "@app/keyboard.service";
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-root',
  template: `
    @if (getPermission() | async; as permission) {
      <div class="test"></div>
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
        <div class="keyboard"></div>
        <app-event-message-queue/>
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
    "keyboard keyboard" env(keyboard-inset-height, 0px)
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
  imports: [TopBarComponent, SideMenuComponent, MainComponent, FooterComponent, AsyncPipe, EventMessageQueueComponent]
})
export class AppComponent {

  private readonly keyboardService = inject(KeyboardService);
  private readonly subscriptionService = createSubscriptionService();

  public constructor() {
    const logInterceptor = inject(SystemLogInterceptor);
    logInterceptor.init();
    //to fix lazy build additional css for routes in ssr
    const keyboardListener = this.keyboardService.initializeKeyboardListener();
    if (keyboardListener) this.subscriptionService.subscribe(keyboardListener);
    // afterNextRender(() => {
    //   if ("virtualKeyboard" in navigator) {
    //     console.log((navigator as any).virtualKeyboard);
    //     (navigator as any).virtualKeyboard.overlaysContent = true;
    //   }
    // });
  }

  private readonly permissionService: PermissionService = inject(PermissionService);
  public getPermission = () => this.permissionService.isPublic();
}
