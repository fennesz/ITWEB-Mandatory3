import { MenuItem } from 'primeng/primeng';
import { WorkoutProgramApiService } from '../../services/workoutprogramapi.service';
import { ExerciseModel } from '../../../models/exercisemodel';
import { WorkoutProgramModel } from '../../../models/workoutprogrammodel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-workoutprogram',
  templateUrl: './workoutprogram.component.html',
  styleUrls: ['./workoutprogram.component.css']
})

export class WorkoutprogramComponent implements OnInit {
  public workoutProgramModel: Observable<WorkoutProgramModel>;
  public selectedExercise: ExerciseModel;
  public exerciseToAddOrEdit: ExerciseModel;
  public displayDialogEdit: boolean;
  public displayDialogAdd: boolean;
  public newExercise: boolean;
  public id: string;
  public items: MenuItem[];

  constructor(private workoutProgramService: WorkoutProgramApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.workoutProgramModel = this.workoutProgramService.getWorkoutProgram(this.id);
      this.workoutProgramModel.subscribe((out) => console.log(out));
   });

   this.items = [
    {label: 'Delete', icon: 'fa-close', command: (event) => this.delete()},
    {label: 'Edit', icon: 'fa-close', command: (event) => this.showDialogToEdit()},
  ];
  }

  public showDialogToAdd() {
    this.newExercise = true;
    this.exerciseToAddOrEdit = {} as ExerciseModel;
    this.displayDialogAdd = true;
  }

  public showDialogToEdit() {
    this.displayDialogEdit = true;
    this.exerciseToAddOrEdit = {} as ExerciseModel;
    this.exerciseToAddOrEdit = Object.assign(this.exerciseToAddOrEdit, this.selectedExercise); 
  }

  private editExercise() {
  }

  public onRowSelect(event) {
    // Goto exerciseLog page
  }

  public delete() {
    this.workoutProgramService.deleteExerciseInWorkoutProgram(this.id, this.selectedExercise).subscribe();
  }

  public saveAdd() {
      this.workoutProgramService.postExerciseToWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe();
      this.displayDialogAdd = false;
      this.newExercise = false;
  }

  public saveEdit() {
    this.workoutProgramService.editExerciseInWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe((obj) => {
        this.displayDialogEdit = false;
        console.log(obj);
    });
  }
}
