import {Injectable, Type} from "@angular/core";
import {map, Observable, switchMap} from "rxjs";
import {LocaleHost} from "./LocaleHost";
import {TextDictionaryServcie} from "./TextDictionaryService";
import {ITextFactory, ITitleFactory} from "../menu-system/IHasTitle";
import {HomeComponent} from "app/features/home/home.component";
import {LoginComponent} from "@common/permission-system/components/login/login.component";
import {LoginTextFactory} from "@common/permission-system/components/login/locale/LoginText";
import {HomeTextFactory} from "@app/features/home/locale/home.text";
import {getKeys} from "@common/help/help-fuctions";
import {LogsTextFactory} from "@app/features/logs/locale/logs.text";
import {LogsComponent} from "@app/features/logs/logs.component";

export const translationMap = {
  loginComponent: {factory: new LoginTextFactory(), component: LoginComponent},
  homeComponent: {factory: new HomeTextFactory(), component: HomeComponent},
  logsComponent: {factory: new LogsTextFactory(), component: LogsComponent},
  home3Component: {factory: {getText: () => ({title: 'test'})}, component: HomeComponent},
};

@Injectable({providedIn: 'root'})
export class TextHost {
  public static readonly SupportedLanguages = ['en', 'it', 'ru', 'fr'];
  public static readonly DefaultLanguage = 'en';

  public constructor(private readonly localeHost: LocaleHost, private readonly dictionaryService: TextDictionaryServcie) {
  }

  private getMenuInstanceAsync<TKey extends TKeyOfFactory<ITitleFactory>>(key: TKey): Observable<ReturnType<TFactoryType<TKey>['getTitle']>> {
    const textFactory = getTitleFactory(key);
    const factory = textFactory.getTitle;

    if (factory === undefined) return undefined!;//runtime check

    return this.localeHost.language$
      .pipe(switchMap(label => this.dictionaryService.getTextDictionary(label).pipe(map(d => factory(d) as ReturnType<TFactoryType<TKey>['getTitle']>))));
  }

  private getTextInstanceAsync<TKey extends TKeyOfFactory<ITextFactory>>(key: TKey): Observable<ReturnType<TFactoryType<TKey>['getText']>> {
    const textFactory = getTextFactory(key);
    const factory = textFactory.getText;

    if (factory === undefined) return undefined!;//runtime check

    return this.localeHost.language$
      .pipe(switchMap(label => this.dictionaryService.getTextDictionary(label).pipe(map(d => factory(d) as ReturnType<TFactoryType<TKey>['getText']>))));
  }


  public getMenuItem<K extends TKeyOfFactory<ITitleFactory>>(key: K) {
    return this.getMenuInstanceAsync(key);
  }

  public getMenuItemByType<T>(type: Type<T>) {
    const key = getKeys(translationMap).find(k => translationMap[k].component === type) as TKeyOfFactory<ITitleFactory>;
    if (key === undefined) return;
    return this.getMenuItem(key);
  }

  public getText<K extends TKeyOfFactory<ITextFactory>>(key: K) {
    return this.getTextInstanceAsync(key);
  }

  public getTextByType<T>(type: Type<T>) {
    const key = getKeys(translationMap).find(k => translationMap[k].component === type) as TKeyOfFactory<ITextFactory>;
    if (key === undefined) return;
    return this.getText(key);
  }
}

type TKeyOfFactory<TFactory> = PickKeyByType<TranslationMap, { factory: TFactory }>;
type TFactoryType<TKey extends keyof TranslationMap> = TranslationMap[TKey]['factory'];

function getTextFactory<TKey extends TKeyOfFactory<ITextFactory>>(key: TKey): TFactoryType<TKey> {
  return translationMap[key].factory;
}

function getTitleFactory<TKey extends TKeyOfFactory<ITitleFactory>>(key: TKey): TFactoryType<TKey> {
  return translationMap[key].factory;
}

type TranslationMap = typeof translationMap;
type PickKeyByType<Type, KeyType> = keyof { [Key in keyof Type as Type[Key] extends KeyType ? Key : never]: Key };


