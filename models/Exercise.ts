export class Exercise {
    ExerciseName: string;
    Description: string;
    Sets: number;
    RepsOrTime: string;

    constructor() {
        this.ExerciseName = "Exercise name";
        this.Description = "Exercise description";
        this.Sets = 0;
        this.RepsOrTime = "x reps / x minutes";
    }
}