import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TextHost} from "@common/lang-system/TextHost";
import {ContactsPanelText} from "@app/features/contacts/components/panel/contacts-panel.locale";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-contacts-panel',
  imports: [
    MatButton,
    RouterLink
  ],
  template: `
    @if (text(); as text) {
      <div class="container">
        <button [routerLink]="['new']" mat-raised-button>
          {{ text.add }}
        </button>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPanelComponent {
  public readonly text: Signal<ContactsPanelText | undefined> = inject(TextHost).getTextSignal('contactsPanel');
}
