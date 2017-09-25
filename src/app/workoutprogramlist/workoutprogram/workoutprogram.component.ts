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
  public exerciseToAdd: ExerciseModel;
  public displayDialog: boolean;
  public newExercise: boolean;
  public id: string;

  constructor(private workoutProgramService: WorkoutProgramApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.workoutProgramModel = this.workoutProgramService.getWorkoutProgram(this.id);
      this.workoutProgramModel.subscribe((out) => console.log(out));
   });
  }

  public showDialogToAdd() {
    this.newExercise = true;
    this.exerciseToAdd = {} as ExerciseModel;
    this.displayDialog = true;
  }

  public onRowSelect(event) {
    
  }

  public delete() {

  }

  public save() {
    console.log(this.exerciseToAdd);
      this.workoutProgramService.postExerciseToWorkoutProgram(this.id, this.exerciseToAdd).subscribe((out) => console.log(out));
      this.displayDialog = false;
  }
}