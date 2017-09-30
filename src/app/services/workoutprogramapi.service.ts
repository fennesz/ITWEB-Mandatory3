import { ExerciseModel } from '../../models/exercisemodel';
import { WorkoutProgramModel } from '../../models/workoutprogrammodel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/mergeMap";
import {Router} from '@angular/router';
import { WorkoutProgramModelDto } from '../../models/dtos/workoutprogrammodeldto';


@Injectable()
export class WorkoutProgramApiService {
    baseUrl: String = 'https://itweb-mandatory2.herokuapp.com';

    constructor(private http: HttpClient) { }

    public getWorkoutProgramList(): Observable<WorkoutProgramModel[]> {
        return this.http.get<WorkoutProgramModel[]>(this.baseUrl + '/api/workoutprogram');
    }

    public getWorkoutProgram(id: string) {
        return this.http.get<WorkoutProgramModel>(this.baseUrl + '/api/workoutprogram/' + id);
    }

    public postExerciseToWorkoutProgram(id: string, exercise: ExerciseModel): Observable<any> {
        return this.http.post(this.baseUrl + '/api/workoutprogram/' + id + '/exercise/', exercise).mergeMap((ex: any) => {
            return this.editExerciseInWorkoutProgram(id, ex);
        });
    }

    public editExerciseInWorkoutProgram(id: string, exercise: ExerciseModel): Observable<any> {
        console.log(exercise);
        return this.http.put(this.baseUrl + '/api/workoutprogram/' + id + '/exercise/' + exercise._id, exercise);
    }

    public deleteWorkoutProgram(id: string) {
        return this.http.delete(this.baseUrl + '/api/workoutprogram/' + id);
    }

    public postWorkoutProgram(workoutprogrammodel: WorkoutProgramModel):  Observable<any> {
        const work = workoutprogrammodel as WorkoutProgramModelDto;
        return this.http.post(this.baseUrl + '/api/workoutprogram', workoutprogrammodel).mergeMap((link: any) => {
            let str = 'https://' + link.location;
            return this.http.put(str, work);
        });
    }

    public editWorkoutProgram(workoutprogrammodel: WorkoutProgramModel):  Observable<any> {
        const id: string = workoutprogrammodel._id;
        delete workoutprogrammodel._id;
        const work = workoutprogrammodel as WorkoutProgramModelDto;
        console.log(work);
        return this.putObjectAndId(id, work);
      }

      private putObjectAndId(id: string, work: WorkoutProgramModelDto): Observable<any> {
        return this.http.put(this.baseUrl + '/api/workoutprogram/' + id, work);
      }
}