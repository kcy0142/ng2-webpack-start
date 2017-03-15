import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { PosterComponent } from './poster/poster.component';
import { Poster1Component } from './poster1/poster1.component';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PosterComponent,
        Poster1Component
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
