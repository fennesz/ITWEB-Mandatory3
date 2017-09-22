import { AppRouterModule } from '../AppRouterModule/AppRouterModule.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WorkoutprogramComponent } from './workoutprogram/workoutprogram.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    WorkoutprogramComponent
],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
