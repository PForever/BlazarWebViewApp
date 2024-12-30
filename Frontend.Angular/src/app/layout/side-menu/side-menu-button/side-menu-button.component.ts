import {ChangeDetectionStrategy, Component, HostListener, inject, viewChild} from '@angular/core';
import {SideMenuService} from '../services/SideMenuService';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-menu-button',
  template: `
    <button #menuButton
            color="primary"
            class="icon-button"
            (click)="sideMenuService.opened = !sideMenuService.opened"
            mat-stroked-button>
      <mat-icon>menu</mat-icon>
    </button>

  `,
  styles: `
    @import url("assets/styles/buttons.css");

    .icon-button {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatIcon]
})
export class SideMenuButtonComponent {
  public readonly menu = viewChild.required<MatButton>('menuButton');
  public readonly sideMenuService = inject(SideMenuService);

  @HostListener('window:click', ['$event'])
  public closeMenuIfClickAway(e: Event) {
    if (this.sideMenuService.opened && !this.menu()._elementRef.nativeElement.contains(e.target)) this.sideMenuService.opened = false;
  }
}
