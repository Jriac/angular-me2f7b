import { Component, Input, OnInit,Inject } from '@angular/core';
import {I18NextModule,ITranslationService,I18NEXT_SERVICE } from 'angular-i18next'

@Component({
  selector: 'translation',
  templateUrl: '/translation.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class TranslationComponent implements OnInit  {

  constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService){
  }

ngOnInit(){

  this.i18NextService.events.languageChanged.subscribe(lang => {
  })
}

  @Input() name: string;
}
             