import { ExerciseModel } from './exercisemodel';

export interface WorkoutProgramModel {
    _id: string;
    Name: string;
    ExerciseList: ExerciseModel[];
}
