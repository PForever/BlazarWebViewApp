import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {LocaleHost} from '../../lang-system/LocaleHost';
import {UserService} from '../UserService';
import {NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {createSubscriptionService} from "@common/help/services/subscription.service";

@Component({
  selector: 'app-sign-io-button',
  template: `
    <ng-container *ngIf="horizontal(); else vertical">
      <button *ngIf="userService.currentUser === undefined; else login" color="basic" class="theme-button icon-button"
              (click)="onSignIn(lang())" mat-icon-button>
        <mat-icon>login</mat-icon>
      </button>
      <ng-template #login>
        <button color="basic" class="theme-button icon-button" (click)="onSignOut(lang())" mat-icon-button>
          <mat-icon>logout</mat-icon>
        </button>
      </ng-template>
    </ng-container>
    <ng-template #vertical>
      <button *ngIf="userService.currentUser === undefined; else login" color="basic" class="theme-button vertical"
              (click)="onSignIn(lang())" mat-stroked-button extended>
        <span>Log In</span>
        <mat-icon>login</mat-icon>
      </button>
      <ng-template #login>
        <button color="basic" class="theme-button vertical" (click)="onSignOut(lang())" mat-stroked-button extended>
          <span>Log Out</span>
          <mat-icon>logout</mat-icon>
        </button>
      </ng-template>
    </ng-template>

  `,
  styles: `
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

    .theme-button {
      border: none;
      color: var(--foreground-icon);
    }

    .vertical {
      width: 100%;
    }

    .vertical span {
      white-space: nowrap;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatIconButton, MatIcon, MatButton],
})
export class SignIoButtonComponent {
  public readonly horizontal = input(true);
  private readonly subscriptionService = createSubscriptionService();

  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);
  public readonly lang = this.localeHost.language;
  public readonly userService = inject(UserService);

  public onSignIn(lang: string) {
    const path = `/${lang}/login`;
    const url = path;

    const navigationExtras: NavigationExtras = {
      queryParams: {redirectInfo: this.router.url, redirectLang: lang},
    };
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`/${url}`], navigationExtras);
    })
  }

  public onSignOut(lang: string) {
    this.subscriptionService.subscribe(this.userService.singOut(), () => {
      const path = `/${lang}/login`;
      const url = path;//this.router.url;

      const navigationExtras: NavigationExtras = {
        queryParams: {redirectInfo: this.router.url, redirectLang: lang},
      };
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([`/${url}`], navigationExtras);
      })
    });
  }
}
