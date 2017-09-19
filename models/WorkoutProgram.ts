import { Exercise } from './Exercise';

export class WorkoutProgram {
    Name: string;
    ExerciseList: Exercise[];

    constructor() {
        this.Name = "Workout program";
        this.ExerciseList = [];
    }
}