import { ExerciseModel } from '../../models/exercisemodel';
import { ExerciseModelDto } from '../../models/dtos/exercisemodelDto';
import { WorkoutProgramModel } from '../../models/workoutprogrammodel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { WorkoutProgramModelDto } from '../../models/dtos/workoutprogrammodeldto';


@Injectable()
export class WorkoutProgramApiService {
    baseUrl: String = 'http://localhost:4242';

    constructor(private http: HttpClient) { }

    public editExerciseInWorkoutProgram(id: string, exercise: ExerciseModel): Observable<ExerciseModel> {
        let dto = this.createExerciseDtoFromModel(exercise);
        return this.http.put<ExerciseModel>(this.baseUrl + '/api/workoutprogram/' + id + '/exercise/' + exercise._id, dto);
    }

    public getWorkoutProgramList(): Observable<WorkoutProgramModel[]> {
        return this.http.get<WorkoutProgramModel[]>(this.baseUrl + '/api/workoutprogram');
    }

    public getWorkoutProgram(id: string) {
        return this.http.get<WorkoutProgramModel>(this.baseUrl + '/api/workoutprogram/' + id);
    }

    public deleteExerciseInWorkoutProgram(id: string, exercise: ExerciseModel): Observable<any> {
        return this.http.delete(this.baseUrl + '/api/workoutprogram/' + id + '/exercise/' + exercise._id);
    }

    public postExerciseToWorkoutProgram(id: string, exercise: ExerciseModel): Observable<any> {
        return this.http.post(this.baseUrl + '/api/workoutprogram/' + id + '/exercise/', exercise).concatMap((link: any) => {
            let dto = this.createExerciseDtoFromModel(exercise);
            return this.http.put<ExerciseModel>(link, dto);
        });
    }

    public deleteWorkoutProgram(id: string) {
        return this.http.delete(this.baseUrl + '/api/workoutprogram/' + id);
    }

    public postWorkoutProgram(workoutprogrammodel: WorkoutProgramModel): Observable<any> {
        const work = workoutprogrammodel as WorkoutProgramModelDto;
        return this.http.post(this.baseUrl + '/api/workoutprogram', workoutprogrammodel).concatMap((link: any) => {
            const str = 'https://' + link.location;
            return this.http.put(str, work);
        });
    }

    public editWorkoutProgram(workoutprogrammodel: WorkoutProgramModel): Observable<any> {
        const id: string = workoutprogrammodel._id;
        delete workoutprogrammodel._id;
        const work = workoutprogrammodel as WorkoutProgramModelDto;
        return this.putObjectAndId(id, work);
    }

    private putObjectAndId(id: string, work: WorkoutProgramModelDto): Observable<any> {
        return this.http.put(this.baseUrl + '/api/workoutprogram/' + id, work);
    }

    private createExerciseDtoFromModel(exercise: ExerciseModel): ExerciseModelDto {
        return {
            Description: exercise.Description,
            ExerciseName: exercise.ExerciseName, 
            RepsOrTime: exercise.RepsOrTime, 
            Sets: exercise.Sets
        };
    }
}
