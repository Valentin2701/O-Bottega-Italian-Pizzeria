import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from "../shared/shared.module";
import { GlobalErrorComponent } from './components/global-error/global-error.component';


@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    GlobalErrorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
],
  exports: [NavComponent, FooterComponent, GlobalErrorComponent]
})
export class CoreModule { }
