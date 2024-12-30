import { NgModule } from '@angular/core';
import { ThemeSwitcher } from '@common/theming/services/ThemeSwitcher';


const serivces = [ThemeSwitcher];

@NgModule({
  providers: [serivces]
})
export class ThemingModule { }
