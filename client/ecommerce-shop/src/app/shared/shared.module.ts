import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [SidebarComponent, LoaderComponent]
})
export class SharedModule { }
