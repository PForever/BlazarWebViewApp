import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main',
    template: `
    <div class="container">
      <router-outlet/>
    </div>
  `,
    styles: `
    .container {
      /* padding: 0.5em; */
      height: 100%;
      background-color: var(--background-background);
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet]
})
export class MainComponent {

}
