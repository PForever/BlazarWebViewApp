import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-logs',
  template: `
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class LogsComponent {
}
