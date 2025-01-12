import {ChangeDetectionStrategy, Component, computed, inject, input, output, Signal} from '@angular/core';
import {TextHost} from "@common/lang-system/TextHost";
import {ContactsFilterText} from "@app/features/contacts/components/filters/contacts-filters.locale";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Filter} from "@app/features/contacts/components/filters/filter";
import {simpleFieldClone} from "@common/help/help-fuctions";

@Component({
  selector: 'app-contacts-filters',
  template: `
    @if (text(); as text) {
      @let filter = model();
      <form class="form" #contactForm="ngForm" (ngSubmit)="onFilterChange()">
        <mat-form-field appearance="outline">
          <mat-label>{{ text.allTextFields }}</mat-label>
          <input matInput [(ngModel)]="filter.allText" name="allText">
        </mat-form-field>
        <div>
          <button [disabled]="contactForm.invalid" mat-raised-button type="submit">{{ text.apply }}</button>
          <button mat-raised-button type="reset" (click)="onFilterChange()">{{ text.cancel }}</button>
        </div>
      </form>
    }
  `,
  styles: `
    .form {
      display: flex;
      flex-flow: row wrap;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsFiltersComponent {
  public readonly filterChange = output<Filter>();
  public readonly filter = input<Filter | undefined>({});
  public readonly model = computed(() => this.filter() ?? {});
  public readonly text: Signal<ContactsFilterText | undefined> = inject(TextHost).getTextSignal('contactsFilter');

  onFilterChange() {
    const filter = copy(this.model());
    this.filterChange.emit(filter);
  }
}


function copy(filter: Filter | undefined) {
  return simpleFieldClone(filter, {} as Filter, {copyAll: true});
}

