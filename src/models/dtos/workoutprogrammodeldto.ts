import { ExerciseModel } from '../exercisemodel';

export interface WorkoutProgramModelDto {
    Name: string;
    ExerciseList: ExerciseModel[];
}
