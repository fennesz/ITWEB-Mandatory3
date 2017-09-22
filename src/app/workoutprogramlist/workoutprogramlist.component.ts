import { HttpClient } from '@angular/common/http';
import { WorkoutProgramModel } from '../../models/workoutprogrammodel';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { WorkoutprogramComponent } from './workoutprogram/workoutprogram.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workoutprogramlist',
  templateUrl: './workoutprogramlist.component.html',
  styleUrls: ['./workoutprogramlist.component.css']
})
export class WorkoutProgramListComponent implements OnInit {
  displayDialog: boolean;
  newProgram: boolean;
  programToAdd: WorkoutprogramComponent;
  selectedProgram: WorkoutprogramComponent;
  programList: Observable<WorkoutProgramModel[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.programList = this.http.get<WorkoutProgramModel[]>('https://itweb-mandatory2.herokuapp.com/api/workoutprogram');
  }

  public showDialogToAdd() {
    this.newProgram = true;
    this.programToAdd = new WorkoutprogramComponent();
    this.displayDialog = true;
  }

}
