import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from 'src/app/components/sharedComponents/no-data/no-data.component';
import { LoaderComponent } from 'src/app/components/sharedComponents/loader/loader.component';
import { InputRestrictionDirective } from 'src/app/directives/numeric-only.directive';



@NgModule({
  declarations: [
    NoDataComponent,
    LoaderComponent,
    InputRestrictionDirective
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    NoDataComponent,
    LoaderComponent,
    InputRestrictionDirective]
})
export class SharedModule { }
