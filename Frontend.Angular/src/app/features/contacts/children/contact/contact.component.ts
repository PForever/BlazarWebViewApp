import {ChangeDetectionStrategy, Component, inject, input, resource, Signal} from '@angular/core';
import {TextHost} from "@common/lang-system/TextHost";
import {ContactText} from "@app/features/contacts/children/contact/contact.locale";
import {Contact} from "@app/features/contacts/model/contact";
import {ContactEditorComponent} from "@app/features/contacts/children/contact/editor/contact-editor.component";
import {ContactRepository} from "@app/features/contacts/services/contact.repository";
import {Result, toResult} from "@common/help/services/Result";
import {IfSuccessDirective} from "@common/components/errors/if-success.directive";
import {ActivatedRoute, Router} from "@angular/router";
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";
import {tryConvertToNumber} from "@common/help/help-fuctions";

@Component({
  selector: 'app-contact',
  template: `
    <app-contact-editor class="container" *ifSuccess="contact.value() as value" [contact]="value"
                        (contactChange)="onChanged($event)"/>
  `,
  styles: `
    .container {
      padding: 2.5em;
    }
  `,
  imports: [
    ContactEditorComponent,
    IfSuccessDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public readonly text: Signal<ContactText | undefined> = inject(TextHost).getTextSignal('contact');
  //TODO check if is number on the route side
  public readonly id = input<string>();
  public readonly contact = resource({
    request: () => tryConvertToNumber(this.id()) ?? 0,
    loader: ({request}) => this.getOrCreate(request)
  });
  private readonly repository = inject(ContactRepository);

  private getOrCreate(id: number): Promise<Result<Contact>> {
    if (id <= 0) {
      return Promise.resolve(toResult({created: new Date(Date.now())} as Contact));
    }
    return this.repository.get(id);
  }

  async onChanged(contact: Contact) {
    if (this.id() === undefined) {
      const result = await this.repository.add(contact);
      if (!result.successful) {
        this.eventMessageQueue.pushError(`Adding value ${contact} failed`);
        return;
      }
      const isNavigationSuccess = await this.router.navigate([result.value], {relativeTo: this.route.parent});
      if (!isNavigationSuccess) console.error(`Navigation to ${this.route.parent?.url}/${result.value} failed`);
    } else {
      const result = await this.repository.update(contact);
      if (!result.successful) {
        this.eventMessageQueue.pushError(`Updating value ${contact} failed: ${result.errorMessage}`);
        return;
      }
      await this.router.navigate([contact.id], {relativeTo: this.route.parent});
    }
  }
}
