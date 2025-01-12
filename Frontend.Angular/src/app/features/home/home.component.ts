import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {DotNetService} from "@common/backend/dotnet-service";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MenuItemReach, MenuService} from "@app/layout/side-menu/services/MenuServices";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  template: `
    <div class="items">
      @for (item of items$ | async; track item.icon) {
        <div class="item">
          <mat-icon class="icon">{{ item.icon }}</mat-icon>
          <span class="text">{{ item.title }}</span>
        </div>
      }
    </div>
    <button mat-raised-button (click)="onTestClick()">Test</button>
  `,
  styles: `
    .items {
      display: flex;
      flex-flow: row wrap;
      gap: 2em;

      & .item {
        width: 100px;
        height: 100px;

        display: grid;
        justify-content: center;
        grid-template:
        "icon" 1fr
        "title" auto;

        & .icon {
          grid-area: icon;
        }

        & .text {
          grid-area: title;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
    MatIcon,
  ]
})
export class HomeComponent {

  private readonly menuService = inject(MenuService);
  public readonly items$: Observable<MenuItemReach[]> = this.menuService.items;

  private readonly dotNetService = inject(DotNetService);

  async onTestClick() {
    const result = await this.dotNetService.invokeMethod<string>("GetDataBasePath");
    console.log(result);
  }
}
