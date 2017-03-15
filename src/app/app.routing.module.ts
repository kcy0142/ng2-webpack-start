import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PosterComponent } from './poster/poster.component';
import { Poster1Component } from './poster1/poster1.component';

const routes: Routes = [
  { path: '', redirectTo: '/poster', pathMatch: 'full' },
  { path: 'poster', component: PosterComponent },
  { path: 'poster1', component: Poster1Component },
  { path: 'app', component: AppComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
