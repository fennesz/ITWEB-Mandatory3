import { WorkoutProgramApiService } from '../services/workoutprogramapi.service';
import { HttpClient } from '@angular/common/http';
import { WorkoutProgramModel } from '../../models/workoutprogrammodel';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { WorkoutprogramComponent } from './workoutprogram/workoutprogram.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-workoutprogramlist',
  templateUrl: './workoutprogramlist.component.html',
  styleUrls: ['./workoutprogramlist.component.css']
})
export class WorkoutProgramListComponent implements OnInit {
  displayDialogEdit: boolean;
  displayDialogAdd: boolean;
  newProgram: boolean;
  programToAddOrEdit: WorkoutProgramModel;
  selectedWorkoutprogram: WorkoutProgramModel;
  programList: Observable<WorkoutProgramModel[]>;
  items: MenuItem[];

  constructor(private apiService: WorkoutProgramApiService, private router: Router) { }

  ngOnInit() {
    this.programList = this.apiService.getWorkoutProgramList();
    this.items = [
      {label: 'Delete', icon: 'fa-close', command: (event) => this.delete()},
      {label: 'Edit', icon: 'fa-close', command: (event) => this.editWorkoutProgram()},
  ];
  }

  public showDialogToAdd() {
    this.newProgram = true;
    this.programToAddOrEdit = this.cloneWorkoutProgram(this.selectedWorkoutprogram);
    this.displayDialogAdd = true;
  }

  private editWorkoutProgram() {
    this.programToAddOrEdit = this.cloneWorkoutProgram(this.selectedWorkoutprogram);
    this.displayDialogEdit = true;
  }

  public navigateToWorkoutprogram() {
    this.navigateToId(this.selectedWorkoutprogram._id);
  }

  public delete() {
      this.apiService.deleteWorkoutProgram(this.selectedWorkoutprogram._id).subscribe();
  }

  public savePost() {
    this.displayDialogAdd = false;
    this.programToAddOrEdit.ExerciseList = [];
    this.apiService.postWorkoutProgram(this.programToAddOrEdit).subscribe();
  }

  public saveEdit() { //
    this.displayDialogEdit = false;
    this.apiService.editWorkoutProgram(this.programToAddOrEdit).subscribe();
  }

  private cloneWorkoutProgram(c: WorkoutProgramModel): WorkoutProgramModel {
    let wp = {} as WorkoutProgramModel;
    for(let prop in c) {
        wp[prop] = c[prop];
    }
    return wp;
  }

    private navigateToId(id: string) {
      this.router.navigate(['/workoutprogram', id]);
  }

}
