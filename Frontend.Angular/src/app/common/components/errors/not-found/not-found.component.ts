import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: `
    <div class="container">
      <span class="text">404 Not found</span>
    </div>
  `,
    styles: `
    .container {
      height: 100%;
      display: grid;
      align-content: center;
      justify-items: center;
    }

    .text {
      font-size: 5em;
      font-weight: bold;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

}
