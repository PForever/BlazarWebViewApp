import {ChangeDetectionStrategy, Component, inject, linkedSignal, model, output, resource, Signal} from '@angular/core';
import {TextHost} from "@common/lang-system/TextHost";
import {Contact} from "@app/features/contacts/model/contact";
import {FormsModule} from "@angular/forms";
import {ContactsEditorText} from "@app/features/contacts/children/contact/editor/contacts-editor.locale";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {DotNetService} from "@common/backend/dotnet-service";
import {tryConvertToNumber} from "@common/help/help-fuctions";
import {MatSelectModule} from "@angular/material/select";
import {EventTypeRepository} from "@app/features/contacts/children/contact/editor/event-type.repository";
import {IfSuccessDirective} from "@common/components/errors/if-success.directive";

@Component({
  selector: 'app-contact-editor',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    IfSuccessDirective
  ],
  template: `
    @if (text(); as text) {
      @let model = contact();
      <form class="form" #contactForm="ngForm" (ngSubmit)="onSubmit(model)">
        <mat-form-field appearance="outline">
          <mat-label>{{ text.firstName }}</mat-label>
          <input matInput [(ngModel)]="model.firstName" name="firstName">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ text.lastName }}</mat-label>
          <input matInput [(ngModel)]="model.lastName" name="lastName">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>{{ text.phone }}</mat-label>
          <!--          <input matInput type="tel" pattern="([0-9]{3}) [0-9]{3}-[0-9]{2}-[0-9]{2}" [(ngModel)]="model.phone"-->
          <!--                 name="phone">-->
          <input matInput type="number" [(ngModel)]="phone" name="phone">
          <button mat-icon-button type="button" (click)="onCall(phone())">
            <mat-icon>phone</mat-icon>
          </button>
        </mat-form-field>

        <mat-form-field *ifSuccess="eventTypeList.value() as eventTypeList">
          <mat-label>{{ text.eventTypes }}</mat-label>
          <mat-select [(ngModel)]="model.eventTypeIds" multiple>
            @for (eventType of eventTypeList; track eventType.id) {
              <mat-option [value]="eventType.id">{{ eventType.title }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ text.address }}</mat-label>
          <input matInput [(ngModel)]="model.address" name="address">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ text.notes }}</mat-label>
          <textarea matInput [(ngModel)]="model.notes" name="notes"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>{{ text.age }}</mat-label>
          <input matInput type="number" [(ngModel)]="age" name="age">
        </mat-form-field>

        <div class="panel">
          <button mat-raised-button type="reset" (click)="onCancel()">{{ text.cancel }}</button>
          <button [disabled]="contactForm.untouched || contactForm.invalid" mat-raised-button
                  type="submit">{{ text.save }}
          </button>
        </div>
      </form>
    }
  `,
  styles: `
    .form {
      display: flex;
      flex-direction: column;
    }

    .panel {
      display: flex;
      gap: 0.5em;
      justify-content: end;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditorComponent {
  private readonly eventTypeRepository = inject(EventTypeRepository);
  public readonly eventTypeList = resource({
    loader: () => this.eventTypeRepository.getAll(),
  });

  public readonly text: Signal<ContactsEditorText | undefined> = inject(TextHost).getTextSignal('contactsEditor');
  public readonly contact = model.required<Contact>();
  public readonly phone = linkedSignal<number | undefined>(() => tryConvertToNumber(this.contact().phone));
  public readonly age = linkedSignal<number | undefined>(() => getAge(this.contact()?.birthDate));
  public readonly contactChange = output<Contact>();
  private readonly dotNetService = inject(DotNetService);

  onSubmit(contact: Contact) {
    contact.phone = `${this.phone()}`;
    contact.birthDate = getBirthDate(this.age());
    this.contactChange.emit(contact);
  }

  onCancel() {
  }

  async onCall(phone: number | undefined) {
    if (!phone) return;
    await this.dotNetService.dialPhoneNumber(`${phone}`);
  }
}

function getAge(birthDate?: Date | string) {
  if (!birthDate) return;
  birthDate = birthDate instanceof Date ? birthDate : new Date(birthDate);
  console.log(birthDate);
  const today = new Date();
  return today.getFullYear() - birthDate.getFullYear();
}

function getBirthDate(age: number | undefined) {
  if (!age) return;
  const today = new Date();
  today.setFullYear(today.getFullYear() - age);
  return today;
}
