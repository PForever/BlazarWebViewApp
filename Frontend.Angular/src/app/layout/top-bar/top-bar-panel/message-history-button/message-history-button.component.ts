import {Component, inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MessageHistoryComponent, MessageHistoryComponentData} from '../message-history/message-history.component';
import {filter} from 'rxjs';
import {MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {HistoryLocalStorage} from "@common/help/services/HistoryLocalStorage";

@Component({
  selector: 'app-message-history-button',
  template: `
    <button mat-mini-fab color="primary" (click)="openHistory()">
      <mat-icon>notifications</mat-icon>
    </button>
  `,
  styles: ``,
  standalone: true,
  imports: [MatMiniFabButton, MatIcon]
})
export class MessageHistoryButtonComponent {
  private readonly historyLocalStorage = inject(HistoryLocalStorage);
  private readonly dialog = inject(MatDialog);

  openHistory() {
    const history = this.historyLocalStorage.get().sort((a, b) => a.date > b.date ? -1 : b.date > a.date ? 1 : 0);
    const dialogRef = this.dialog.open<MessageHistoryComponent, MessageHistoryComponentData, boolean>(MessageHistoryComponent, {
      data: {messages: history}
    });
    return dialogRef.afterClosed().pipe(filter(r => r === true)).subscribe(_ => this.historyLocalStorage.clear());
  }
}
