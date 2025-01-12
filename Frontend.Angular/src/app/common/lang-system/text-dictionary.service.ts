import {computed, inject, Injectable} from "@angular/core";
import {TranslationCsvReader} from "@common/lang-system/TranslationCsvReader";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {map, switchMap} from "rxjs";
import {getMapValue} from "@common/help/help-fuctions";

@Injectable({providedIn: 'any'})
export class TextDictionaryService {
  private readonly translationCsvReader = inject(TranslationCsvReader);

  private readonly localeHost = inject(LocaleHost);

  public readonly textDictionary$ = this.localeHost.language$
    .pipe(switchMap(lang => this.translationCsvReader.getFile$().pipe(map(f => f.get(lang) ?? getMapValue(f, 'en')))));

  public readonly textDictionary = computed(() => this.translationCsvReader.file?.get(this.localeHost.language()));
}
