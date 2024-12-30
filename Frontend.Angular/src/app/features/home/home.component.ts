import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {DotNetService} from "@common/backend/dotnet-service";
import {rxResource} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  template: `
    <p>home works!</p>
    <button (click)="onGetDeviceInfo()">Get Contacts</button>
    <span>{{ deviceInfo.value() }}</span>
  `,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public dotNetService = inject(DotNetService);

  private readonly deviceInfoTrigger = signal(0);
  public readonly deviceInfo = rxResource({
    loader: () => this.dotNetService.getDeviceInfo(),
    request: () => this.deviceInfoTrigger()
  })

  public onGetDeviceInfo() {
    console.log("click");
    // this.deviceInfo.reload();
    this.deviceInfoTrigger.set(Date.now());
  }
}
