import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawComponent } from './law.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: "", component: LawComponent }];

@NgModule({
  declarations: [
    LawComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule
  ],
})
export class LawModule { }
