import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {TextHost} from "@common/lang-system/TextHost";
import {EventMessage, EventMessageLevel, SourceType} from "@common/help/services/EventMassageQueue";
import {MessageHistoryText} from "@app/layout/top-bar/top-bar-panel/message-history/locale/MessageHistoryText";
import {Observable} from "rxjs";

@Component({
  selector: 'app-message-history',
  template: `
    @if (text$ | async; as text) {
      <div class="title-block">
        <h1 mat-dialog-title class="title">{{ text.title }}</h1>
      </div>
      <mat-dialog-content class="mat-typography">
        @if (data.messages.length > 0) {
          <table mat-table [dataSource]="data.messages" class="mat-elevation-z8">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>{{ text.date }}</th>
              <td mat-cell *matCellDef="let element"> {{ element.date | date: 'dd/MM/YY HH:mm:ss' }}</td>
            </ng-container>
            <ng-container matColumnDef="level">
              <th mat-header-cell *matHeaderCellDef>{{ text.level }}</th>
              <td mat-cell *matCellDef="let element"> {{ EventMessageLevel[element.level] }}</td>
            </ng-container>
            <ng-container matColumnDef="sourceType">
              <th mat-header-cell *matHeaderCellDef>{{ text.sourceType }}</th>
              <td mat-cell *matCellDef="let element"> {{ SourceType[element.sourceType] }}</td>
            </ng-container>
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>{{ text.message }}</th>
              <td mat-cell *matCellDef="let element"> {{ element.message }}</td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" [ngClass]="GetLevelClass(row.level)"></tr>
          </table>
        } @else {
          <span>{{ text.messageHistoryIsEmpty }}</span>
        }
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close cdkFocusInitial>{{ text.exit }}</button>
        <button mat-button [mat-dialog-close]="true">{{ text.clean }}</button>
      </mat-dialog-actions>
    }
  `,
  styles: `
    .title-block {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .error {
      color: var(--error-button);
    }

    .info {
      color: var(--info-button);
    }

    .warning {
      color: var(--warning-button);
    }

    .trace {
      color: var(--trace-button);
    }

  `,
  imports: [MatTableModule, MatDialogModule, MatButtonModule, AsyncPipe, DatePipe, NgClass]
})
export class MessageHistoryComponent {
  data = inject<MessageHistoryComponentData>(MAT_DIALOG_DATA);

  public text$: Observable<MessageHistoryText>;

  constructor() {
    const textHost = inject(TextHost);

    this.text$ = textHost.getText('messageHistory');
  }

  public displayedColumns = ['date', 'level', 'sourceType', 'value'];

  GetLevelClass(level: EventMessageLevel) {
    switch (level) {
      case EventMessageLevel.Error:
        return 'error';
      case EventMessageLevel.Warn:
        return 'warning';
      case EventMessageLevel.Info:
        return 'info';
      case EventMessageLevel.Trace:
        return 'trace';
      default:
        return '';
    }
  }

  protected readonly EventMessageLevel = EventMessageLevel;
  protected readonly SourceType = SourceType;
}

export interface MessageHistoryComponentData {
  messages: EventMessage[];
}
