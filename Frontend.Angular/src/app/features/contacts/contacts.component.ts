import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ContactsFiltersComponent} from "@app/features/contacts/components/filters/contacts-filters.component";
import {ContactsTableComponent} from "@app/features/contacts/components/table/contacts-table.component";
import {ContactsPanelComponent} from "@app/features/contacts/components/panel/contacts-panel.component";
import {Filter} from "@app/features/contacts/components/filters/filter";

@Component({
  selector: 'app-contacts',
  imports: [
    ContactsFiltersComponent,
    ContactsTableComponent,
    ContactsPanelComponent
  ],
  template: `
    <div class="container">
      <app-contacts-panel/>
      <app-contacts-filters (filterChange)="onFilterChanged($event)"/>
      <app-contacts-table [filter]="filter()"/>
    </div>
  `,
  styles: `
    .container {
      padding: 0.5em;
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {

  public readonly filter = signal<Filter | undefined>(undefined);

  onFilterChanged($event: Filter) {
    console.log('filter changed', $event);
    console.log('filter equal', this.filter() === $event);
    this.filter.set($event);
  }
}
