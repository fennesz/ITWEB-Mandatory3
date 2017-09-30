import { WorkoutProgramApiService } from '../../services/workoutprogramapi.service';
import { ExerciseModel } from '../../../models/exercisemodel';
import { WorkoutProgramModel } from '../../../models/workoutprogrammodel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-workoutprogram',
  templateUrl: './workoutprogram.component.html',
  styleUrls: ['./workoutprogram.component.css']
})

export class WorkoutprogramComponent implements OnInit {
  public workoutProgramModel: Observable<WorkoutProgramModel>;
  public selectedExercise: ExerciseModel;
  public exerciseToAddOrEdit: ExerciseModel;
  public displayDialogPost: boolean;
  public displayDialogEdit: boolean;
  public newExercise: boolean;
  public id: string;
  items: MenuItem[];

  constructor(private workoutProgramService: WorkoutProgramApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.workoutProgramModel = this.workoutProgramService.getWorkoutProgram(this.id);
      this.workoutProgramModel.subscribe((out) => console.log(out));
   });
   this.items = [
      {label: 'Delete', icon: 'fa-close', command: (event) => this.delete()},
      {label: 'Edit', icon: 'fa-close', command: (event) => this.editExercise()},
  ];
  }

  public showDialogToAdd() {
    this.newExercise = true;
    this.exerciseToAddOrEdit = {} as ExerciseModel;
    this.displayDialogPost = true;
  }

  public onRowSelect(event) {
    
  }

  public delete() {

  }

  private cloneExercise(c: ExerciseModel): ExerciseModel {
    const wp = {} as ExerciseModel;
    return Object.assign(wp, c);
  }

  public save() {
      console.log(this.exerciseToAddOrEdit);
      this.workoutProgramService.postExerciseToWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe((out) => console.log(out));
      this.displayDialogPost = false;
  }

  public saveEdit() {
    this.displayDialogEdit = false;
    console.log(this.exerciseToAddOrEdit);
    this.workoutProgramService.editExerciseInWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe((out) => console.log(out));
  }

  private editExercise() {
    this.displayDialogEdit = true;
    this.exerciseToAddOrEdit = this.cloneExercise(this.selectedExercise);
  }
}