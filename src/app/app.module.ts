import { WorkoutProgramApiService } from './services/workoutprogramapi.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AppRouterModule } from '../AppRouterModule/AppRouterModule.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule, DialogModule, SharedModule, ButtonModule, ContextMenuModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WorkoutprogramComponent } from './workoutprogramlist/workoutprogram/workoutprogram.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutProgramListComponent } from './workoutprogramlist/workoutprogramlist.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    WorkoutprogramComponent,
    WorkoutProgramListComponent
],
  imports: [
    BrowserModule,
    AppRouterModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    ContextMenuModule
  ],
  providers: [
    HttpClient,
    WorkoutProgramApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
