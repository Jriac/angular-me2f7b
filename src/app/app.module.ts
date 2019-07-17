import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TranslationComponent } from './translation.component';
import { I18NextModule, I18NextLoadResult, ITranslationService, I18NEXT_SERVICE, defaultInterpolationFormat } from 'angular-i18next';
import * as i18nextXHRBackend from 'i18next-xhr-backend';
import * as i18nextLanguageDetector from 'i18next-browser-languagedetector';

  const i18nOptions = {
    whitelist: ['en', 'es'],
    fallbackLng: 'en',
    debug: true,
    returnEmptyString: false,
    ns: [
      'translation',
    ],
    defaultNS: 'translation',
    interpolation: {
      format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
    },
    backend: {
      loadPath: function (langs, ns) {
        return '../locales/{{lng}}.{{ns}}.json';
      }
    },
  };

export function appInit(i18next: ITranslationService) {
  return () => i18next
      .use(i18nextXHRBackend.default)
      .use(i18nextLanguageDetector)
      .init(i18nOptions);
}


export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }];

@NgModule({
  imports: [BrowserModule, FormsModule, I18NextModule.forRoot()],
  providers: [I18N_PROVIDERS],
  declarations: [AppComponent, TranslationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


