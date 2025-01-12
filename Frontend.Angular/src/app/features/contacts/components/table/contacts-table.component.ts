import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  resource,
  ResourceStatus,
  Signal
} from '@angular/core';
import {Filter} from "@app/features/contacts/components/filters/filter";
import {ContactRepository} from "@app/features/contacts/services/contact.repository";
import {MatTableModule} from "@angular/material/table";
import {IfSuccessDirective} from "@common/components/errors/if-success.directive";
import {DatePipe} from "@angular/common";
import {Result, toResult} from "@common/help/services/Result";
import {Contact} from "@app/features/contacts/model/contact";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {TextHost} from "@common/lang-system/TextHost";
import {ContactsTableText} from "@app/features/contacts/components/table/contacts-table.locale";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-contacts-table',
  template: `
    @if (text(); as text) {
      @if (contactsResource.status() !== ResourceStatus.Idle) {
        <table *ifSuccess="contacts() as contacts" mat-table [dataSource]="contacts">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> {{ text.id }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.id }}</td>
          </ng-container>

          <!-- Created Column -->
          <ng-container matColumnDef="created">
            <th mat-header-cell *matHeaderCellDef> {{ text.created }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.created | date }}</td>
          </ng-container>

          <!-- Birth Date Column -->
          <ng-container matColumnDef="birthDate">
            <th mat-header-cell *matHeaderCellDef> {{ text.birthDate }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.birthDate | date }}</td>
          </ng-container>

          <!-- Notes Column -->
          <ng-container matColumnDef="notes">
            <th mat-header-cell *matHeaderCellDef> {{ text.notes }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.notes }}</td>
          </ng-container>

          <!-- First Name Column -->
          <ng-container matColumnDef="firstName">
            <th mat-header-cell *matHeaderCellDef> {{ text.firstName }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.firstName }}</td>
          </ng-container>

          <!-- Last Name Column -->
          <ng-container matColumnDef="lastName">
            <th mat-header-cell *matHeaderCellDef> {{ text.lastName }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.lastName }}</td>
          </ng-container>

          <!-- Phone Column -->
          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef> {{ text.phone }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.phone }}</td>
          </ng-container>

          <!-- Address Column -->
          <ng-container matColumnDef="address">
            <th mat-header-cell *matHeaderCellDef> {{ text.address }}</th>
            <td mat-cell *matCellDef="let contact"> {{ contact.address }}</td>
          </ng-container>

          <!-- Edit Column -->
          <ng-container matColumnDef="panel">
            <th mat-header-cell *matHeaderCellDef> {{ text.panel }}</th>
            <td mat-cell *matCellDef="let contact">
              <div class="panel">
                <button mat-icon-button (click)="onEdit(contact)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="onDelete(contact)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>

          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      }
    }

  `,
  styles: [`
    table {
      width: 100%;
    }

    .panel {
      display: flex;
    }
  `],
  imports: [MatTableModule, IfSuccessDirective, DatePipe, MatButtonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsTableComponent {
  public readonly text: Signal<ContactsTableText | undefined> = inject(TextHost).getTextSignal('contactsTable');
  displayedColumns: string[] = ['created', 'firstName', 'lastName', 'phone', 'panel'];
  public readonly filter = input<Filter>();
  private readonly contactRepository = inject(ContactRepository);
  public readonly contactsResource = resource({
    request: () => this.filter(),
    loader: ({request}) => this.getContacts(request!)
  });
  public readonly contacts: Signal<Result<Contact[]> | undefined> = computed(() => this.contactsResource.value());

  private async getContacts(request: Filter) {
    console.log(request);
    const contacts = await this.contactRepository.getAll();
    const allText = request.allText?.toLowerCase().replaceAll(' ', '');
    if (contacts.successful && allText !== undefined && allText !== '') {
      return toResult(contacts.value.filter(contact =>
        ('' + contact.firstName +
          contact.lastName +
          contact.phone?.toString() +
          contact.notes +
          contact.address
        ).toLowerCase().replaceAll(' ', '').includes(allText)
      ));
    }
    return contacts;
  }

  protected readonly ResourceStatus = ResourceStatus;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  public async onEdit(contact: Contact) {
    await this.router.navigate([contact.id], {relativeTo: this.route});
  }

  public async onDelete(contact: Contact) {
    await this.contactRepository.delete(contact.id);
    this.contactsResource.reload();
  }
}
