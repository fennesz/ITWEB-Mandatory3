import { Exercise } from "../models/Exercise";
import { WorkoutProgram } from "../models/WorkoutProgram";

export class ModelValidatorService {
    public CheckPutExerciseData(data: Exercise): boolean {
        let exercise = new Exercise();
        for (let field in exercise) {
            if (data[field] == undefined) {
                return false;
            }
        }
        return true;
    }

    public CheckPatchExerciseData(data: any): boolean {
        let exercise = new Exercise();
        for (let field in data) {
            if (exercise[field] == undefined) {
                return false;
            }
        }
        return true;
    }



    public CheckPutData(data: WorkoutProgram): boolean {
        let workoutProgram = new WorkoutProgram();
        for (let field in workoutProgram) {
            if (data[field] == undefined) {
                return false;
            }
        }
        return true;
    }

    public CheckPatchData(data: any): boolean {
        let workoutProgram = new WorkoutProgram();
        for (let field in data) {
            if (workoutProgram[field] == undefined) {
                return false;
            }
        }
        return true;
    }
}