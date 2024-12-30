import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-top-bar-panel-button',
  template: `
    @if (horizontal()) {
      <button color="basic" class="container horizontal" (click)="onClick($event)" mat-icon-button>
        <mat-icon>{{ icon() }}</mat-icon>
        <span class="main-text">{{ text() }}</span>
      </button>
    } @else {
      <button color="basic" class="container vertical icon-button" (click)="onClick($event)" mat-stroked-button
              extended>
        <mat-icon>{{ icon() }}</mat-icon>
        <span class="main-text">{{ text() }}</span>
      </button>
    }
    <ng-template #vertical>
      <button color="basic" class="container vertical icon-button" (click)="onClick($event)" mat-stroked-button
              extended>
        <mat-icon>{{ icon() }}</mat-icon>
        <span class="main-text">{{ text() }}</span>
      </button>
    </ng-template>
  `,
  styles: `
    .container {
      border: none;
      color: var(--foreground-icon);
    }

    .horizontal {

    }

    .vertical {

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

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton, MatIcon, MatButton]
})
export class TopBarPanelButtonComponent {

  public readonly horizontal = input(true);
  public readonly icon = input.required<string>();
  public readonly text = input.required<string>();
  public readonly buttonClick = output<MouseEvent>();

  public onClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }

}
