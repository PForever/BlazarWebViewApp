import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
    selector: 'app-footer',
    template: `
    <div class="subline"></div>
    <div class="container">
      <span class="copyright">{{ copyright }}</span>
    </div>


  `,
    styles: `
    .subline {
      width: 100%;
      border-bottom: 0.1em solid var(--background-border-line);
    }

    .container {
      padding: 1em;
      background: var(--background-card);
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2em;
    }

    .copyright {
      align-self: flex-end;
    }

  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  public readonly copyright = 'Copyright 2024'
}
