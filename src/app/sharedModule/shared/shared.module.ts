import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from 'src/app/components/sharedComponents/no-data/no-data.component';
import { LoaderComponent } from 'src/app/components/sharedComponents/loader/loader.component';



@NgModule({
  declarations: [
    NoDataComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    NoDataComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
