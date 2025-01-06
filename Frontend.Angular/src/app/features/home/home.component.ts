import {ChangeDetectionStrategy, Component, inject, Injectable, resource, signal} from '@angular/core';
import {DotNetService} from "@common/backend/dotnet-service";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, NgForm} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {LogsComponent} from "@app/features/logs/logs.component";

@Component({
  selector: 'app-home',
  template: `
    <p>home works!</p>
    <h2>Add Note</h2>
    <form #form="ngForm" (ngSubmit)="onSubmit(form)" novalidate>
      <mat-form-field appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput name="name" [(ngModel)]="note.name" required placeholder="Enter your name"></mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Value</mat-label>
        <input matInput name="value" [(ngModel)]="note.value" required placeholder="Enter a value"></mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Submit</button>
    </form>
    <button mat-raised-button (click)="logTest()">Log Test</button>
    <button mat-raised-button (click)="getNotes()">Get Notes</button>
    @for (i of notes.value(); track i.name) {
      {{ i.name }}: {{ i.value }}
    }
    <button mat-raised-button (click)="onGetDeviceInfo()">Get DeviceInfo</button>
    <span>{{ deviceInfo.value() }}</span>
    <app-logs/>
  `,
  styles: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    LogsComponent
  ]
})
export class HomeComponent {

  public dotNetService = inject(DotNetService);
  public nodeService = inject(NodeService);

  private readonly deviceInfoTrigger = signal(0);
  public readonly deviceInfo = resource({
    loader: () => this.dotNetService.getDeviceInfo(),
    request: () => this.deviceInfoTrigger()
  })
  private readonly notesTrigger = signal(0);
  public readonly notes = resource({
    loader: () => this.nodeService.getAll(),
    request: () => this.notesTrigger()
  })

  public logTest() {
    console.log('test log');
    console.error('test error');
    console.info('test info');
    // console.warn('test warn');
  }

  public getNotes() {
    this.notesTrigger.set(Date.now());
  }

  public onGetDeviceInfo() {
    this.deviceInfoTrigger.set(Date.now());
  }

  note = {name: '', value: ''};

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const node = await this.nodeService.add(this.note.name, this.note.value);
      console.log('added node', node);
      form.reset();
    }
  }
}

@Injectable({providedIn: 'root'})
export class NodeService {
  public dotNetService = inject(DotNetService);

  public add(name: string, value: string) {
    return this.dotNetService.addNote(name, value);
  }

  public getAll() {
    return this.dotNetService.getNotes();
  }
}
