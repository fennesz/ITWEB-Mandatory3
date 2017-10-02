import { MenuItem } from 'primeng/primeng';
import { WorkoutProgramApiService } from '../../services/workoutprogramapi.service';
import { ExerciseModel } from '../../../models/exercisemodel';
import { WorkoutProgramModel } from '../../../models/workoutprogrammodel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

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
      this.workoutProgramModel.subscribe();
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

  public onRowSelect(event) {
    // Goto exerciseLog page
  }

  public delete() {
    this.workoutProgramService.deleteExerciseInWorkoutProgram(this.id, this.selectedExercise).subscribe((obj) => {
      this.workoutProgramModel = this.workoutProgramModel.map(result => {
        result.ExerciseList.forEach(((ex, i) => {
          if (ex._id === this.selectedExercise._id) {
            result.ExerciseList.splice(i, 1);
          }
        }));
        return result;
    });
    });
  }

  public saveAdd() {
    console.log("saveAdd called");
      this.displayDialogAdd = false;
      this.newExercise = false;
      this.workoutProgramService.postExerciseToWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe((obj) => {
        this.workoutProgramModel = this.workoutProgramModel.map(result => {
            result.ExerciseList.push(obj);
            return result;
        });
      });
  }

  public saveEdit() {
    this.workoutProgramService.editExerciseInWorkoutProgram(this.id, this.exerciseToAddOrEdit).subscribe((obj) => {
        this.displayDialogEdit = false;
        this.workoutProgramModel = this.workoutProgramModel.map(result => {
            result.ExerciseList.forEach((ex => {
              if (ex._id === this.exerciseToAddOrEdit._id) {
                ex = Object.assign(ex, this.exerciseToAddOrEdit);
              }
            }));
            return result;
        });
    });
  }
}
