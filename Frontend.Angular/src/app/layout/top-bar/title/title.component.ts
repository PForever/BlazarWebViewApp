import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TextHost} from '@common/lang-system/TextHost';
import {RouteService} from '@common/routes/RouteService';
import {filter, map, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-title',
  template: `
    @if (title | async; as title) {
      <h1 class="header">{{ title }}</h1>
    }
  `,
  styles: `
    .header {
      margin: 0 0.3em;
      color: var(--foreground-icon);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe]
})
export class TitleComponent {
  private readonly routeService = inject(RouteService);
  private readonly textHost = inject(TextHost);
  public title = this.routeService.getActivatedRoute().pipe(
    filter(r => r.component !== undefined),
    switchMap(r => this.textHost.getMenuItemByType(r.component!) ?? of(undefined)),
    map(i => i?.title)
  );
}
