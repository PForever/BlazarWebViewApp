import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, RouterOutlet} from '@angular/router';
import {LocaleHost} from '../lang-system/LocaleHost';
import {RootHrefService} from './RootHrefService';

@Component({
  template: `
    <router-outlet></router-outlet>`,
  imports: [RouterOutlet]
})
export class RootPathComponent implements OnInit {
  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly translateService: LocaleHost,
    private readonly rootPathService: RootHrefService
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const lang = params['lang'];
      this.translateService.setLanguage(lang);
      this.rootPathService.setBaseRoot(lang);
    });
  }
}
