import {Injectable, signal} from "@angular/core";
import {ReplaySubject} from "rxjs";

import {registerLocaleData} from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import localeEn from '@angular/common/locales/en';
import localeEnExtra from '@angular/common/locales/extra/en';
import localeKo from '@angular/common/locales/ko';
import localeKoExtra from '@angular/common/locales/extra/ko';

@Injectable({providedIn: 'root'})
export class LocaleHost {
  private readonly _language$ = new ReplaySubject<string>(1);

  public setLanguage(lang: string) {
    const value = lang.toLocaleLowerCase();
    this._language.set(value);
    this.setLocale(value);
    this._language$.next(value);
  }

  private readonly _language = signal('en');

  public get language() {
    return this._language.asReadonly();
  }

  public readonly language$ = this._language$.asObservable();

  public setLocale(lang: string) {
    // registerLocaleData(localeDe, lang, localeDeExtra);

    switch (lang) {
      case 'de': {
        registerLocaleData(localeDe, 'de', localeDeExtra);
        break;
      }
      case 'en': {
        registerLocaleData(localeDe, 'de', localeDeExtra);
        registerLocaleData(localeKo, 'ke', localeKoExtra);
        registerLocaleData(localeEn, 'en', localeEnExtra);
        break;
      }
      case 'ko': {
        registerLocaleData(localeKo, 'ke', localeKoExtra);

        break;
      }
      default: {
        registerLocaleData(localeEn, 'en', localeEnExtra);
        break;
      }
    }
  }
}
