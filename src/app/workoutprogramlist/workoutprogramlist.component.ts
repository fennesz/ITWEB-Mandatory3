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
    this.programToAddOrEdit = {} as WorkoutProgramModel;
    this.displayDialogAdd = true;
  }

  private editWorkoutProgram() {
    this.programToAddOrEdit = {} as WorkoutProgramModel;
    this.programToAddOrEdit = Object.assign(this.programToAddOrEdit, this.selectedWorkoutprogram);
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

  public saveEdit() {
    console.log(this.programToAddOrEdit);
    this.apiService.editWorkoutProgram(this.programToAddOrEdit).subscribe((obj) => {
      this.displayDialogEdit = false;
      this.programList = this.programList.map(result => {
          result.forEach((ex => {
            if (ex._id === this.programToAddOrEdit._id) {
              ex = Object.assign(ex, this.programToAddOrEdit);
            }
          }));
          return result;
      });
  });
  }

    private navigateToId(id: string) {
      this.router.navigate(['/workoutprogram', id]);
  }

}
