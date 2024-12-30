import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {LogService} from "@common/help/services/log-service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  template: `
    @for (log of logs$ | async; track $index) {
      <span>{{ log }}</span>
    }
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe
  ]
})
export class LogsComponent {
  private readonly logService = inject(LogService);
  public logs$ = this.logService.log$;
}
