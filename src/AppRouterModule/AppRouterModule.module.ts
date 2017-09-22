import { WorkoutprogramComponent } from '../app/workoutprogram/workoutprogram.component';
import { NotfoundComponent } from '../app/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'workoutprogram', component: WorkoutprogramComponent },
  { path: '',   redirectTo: '/workoutprogram', pathMatch: 'full' },
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {}
