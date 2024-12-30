import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-loading',
    template: `
    <div class="container">
      <mat-spinner/>
    </div>
  `,
    styles: `
    .container {
      height: 100%;
      width: 100%;
      display: grid;
      justify-content: center;
      align-items: center;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatProgressSpinner]
})
export class LoadingComponent {

}
