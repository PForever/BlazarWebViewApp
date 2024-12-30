import {ChangeDetectionStrategy, Component, contentChild, input, TemplateRef} from '@angular/core';
import {Result} from '@common/help/services/Result';
import {Observable} from 'rxjs';
import {AsyncPipe, NgTemplateOutlet} from '@angular/common';
import {ErrorsComponent} from '../errors/errors.component';
import {LoadingComponent} from '../../loading/loading.component';

@Component({
  selector: 'app-card',
  template: `
    @if (templateRef(); as templateRef) {
      @if (request$() | async; as request) {
        <ng-container class="card">
          @if (request.successeful) {
            <ng-container [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="request.result"/>
          }
          @if (!request.successeful) {
            <app-errors [result]="request"/>
          }
        </ng-container>
      } @else {
        <app-loading/>
      }
    }

  `,
  styles: `
    .card {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, ErrorsComponent, LoadingComponent, AsyncPipe]
})
export class CardComponent {
  public readonly templateRef = contentChild(TemplateRef);
  public readonly request$ = input<Observable<Result<unknown>>>();
}
