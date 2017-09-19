import { IMongoRepository } from './IMongoRepository';
import { MongoRepository } from './/MongoRepository';
import { CurrentConfig } from './ConfigLoader';
import { WorkoutProgram } from './models/WorkoutProgram';


export function GetWorkoutProgramRepo(): IMongoRepository<WorkoutProgram> {
    let conf = CurrentConfig();
    return new MongoRepository<WorkoutProgram>(conf.DBConnectionString, conf.WorkoutProgramsCollection);
}