import { APIControllerBase } from './APIControllerBase';
import { IMongoRepository } from '../IMongoRepository';
import { WorkoutProgram } from '../models/WorkoutProgram';
import { Exercise } from '../models/Exercise';
import { GetWorkoutProgramRepo } from '../MongoRepositoryFactory';
var express = require('express');
var router = express.Router();

export class WorkoutController extends APIControllerBase {
    private repository: IMongoRepository<WorkoutProgram>;
    public constructor(repo: IMongoRepository<WorkoutProgram>) {
        super();
        this.repository = repo;
    }

    public GetAll(req, res): void {
        this.SetHeaders(res);
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({});
            })
            .then((data) => {
                res.send(JSON.stringify(data));
                this.SendNotFoundError(res);
            });
    }

    public Get(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1) {
                    res.send(JSON.stringify(data[0]));
                }
                else {
                    this.SendNotFoundError(res);
                }
            });
    }

    public Post(req, res): void {
        this.SetHeaders(res);
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                let workoutProgram = new WorkoutProgram();
                return this.repository.Create(workoutProgram);
            })
            .then((data) => {
                if (data.length == 1) {
                    res.send(JSON.stringify({ 'id': data[0] }));
                }
                else {
                    throw new Error("New workout program could not be created");
                }
            });
    }

    public Put(req, res): void {
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }

        // Guards against wrong data
        let obj = req.body as WorkoutProgram;
        if (!this.CheckPutData(obj)) {
            this.SendWrongDataError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id })
            })
            .then((data) => {
                if (data.length == 1) {
                    return this.repository.Update({ 'id': id }, obj).then((result) => {
                        if (result) {
                            res.status(200);
                            res.send(JSON.stringify(data[0]));
                        }
                        throw new Error("Put operation unsuccessful");
                    });
                }
                else {
                    this.SendNotFoundError(res);
                }
            });
    }

    public Patch(req, res): void {
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }

        // Guards against wrong data
        let obj = req.body as WorkoutProgram;
        if (!this.CheckPatchData(obj)) {
            this.SendWrongDataError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id })
            })
            .then((data) => {
                if (data.length == 1) {
                    return this.repository.Update({ 'id': id }, obj).then((result) => {
                        if (result) {
                            // Herre klamt hack, et ekstra database roundtrip uden grund
                            return this.repository.Read({ 'id': id })
                                .then((result) => {
                                    res.status(200);
                                    res.send(JSON.stringify(result[0]));
                                });
                        }
                        throw new Error("Patch operation unsuccessful");
                    });
                }
                else {
                    this.SendNotFoundError(res);
                }
            });
    }

    public Delete(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id })
            })
            .then((data) => {
                if (data.length == 1) {
                    return this.repository.Delete(data[0]).then((result) => {
                        if (result) {
                            res.status(200);
                            res.send();
                            return;
                        }
                        throw new Error("Delete operation unsuccessful");
                    });
                }
                else {
                    this.SendNotFoundError(res);
                }
                return;
            });
    }

    private CheckPutData(data: WorkoutProgram): boolean {
        let workoutProgram = new WorkoutProgram();
        for (let field in workoutProgram) {
            if (data[field] == undefined) {
                return false;
            }
        }
        return true;
    }

    private CheckPatchData(data: any): boolean {
        let workoutProgram = new WorkoutProgram();
        for (let field in data) {
            if (workoutProgram[field] == undefined) {
                return false;
            }
        }
        return true;
    }

    // public GetExercises(req, res): void {
    //     this.SetHeaders(res);
    //     this.repository.Connect()
    //         .then((connected) => {
    //             if (!connected) {
    //                 throw new Error("Connection not established to database");
    //             }
    //             return this.repository.Read({});
    //         });
    // }

    public GetExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];

        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1 && data[0].ExerciseList[index] != undefined) {
                    res.status(200);
                    res.send(JSON.stringify(data[0].ExerciseList[index]));
                }
                else {
                    this.SendNotFoundError(res);
                }
            });
    }

    public PostExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];

        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1) {
                    let list = data[0].ExerciseList;
                    let exercise = new Exercise();
                    list.push(exercise);
                    return this.repository.Update({ 'id': id }, { 'ExerciseList': list }).then(result => result ? { 'index': list.length - 1, 'exercise': exercise } : undefined);
                }
                else {
                    this.SendNotFoundError(res);
                }
            })
            .then((result) => {
                if (result != undefined) {
                    res.status(200);
                    res.send(JSON.stringify(result));
                }
                else {
                    throw new Error("New Excercise could not be created");
                }
            });
    }

    public PutExercise(req, res): void {
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }

        // Guards against wrong data
        let obj = req.body as Exercise;
        if (!this.CheckPutExerciseData(obj)) {
            this.SendWrongDataError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];

        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1 && data[0].ExerciseList[index] != undefined) {
                    let list = data[0].ExerciseList;
                    list[index] = obj;
                    return this.repository.Update({ 'id': id }, { 'ExerciseList': list })
                        .then(result => result ? { 'index': list.length - 1, 'exercise': obj } : undefined);
                }
                else {
                    this.SendNotFoundError(res);
                }
            })
            .then((result) => {
                if (result != undefined) {
                    res.status(200);
                    res.send(JSON.stringify(result));
                }
                else {
                    throw new Error("Excercise could not be overwritten");
                }
            });
    }

    public PatchExercise(req, res): void {
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }

        // Guards against wrong data
        let obj = req.body as Exercise;
        if (!this.CheckPatchExerciseData(obj)) {
            this.SendWrongDataError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];

        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1 && data[0].ExerciseList[index] != undefined) {
                    let list = data[0].ExerciseList;
                    for (let field in obj) {
                        list[index][field] = obj[field];
                    }
                    return this.repository.Update({ 'id': id }, { 'ExerciseList': list })
                        .then(result => result ? { 'index': list.length - 1, 'exercise': list[index] } : undefined);
                }
                else {
                    this.SendNotFoundError(res);
                }
            })
            .then((result) => {
                if (result != undefined) {
                    res.status(200);
                    res.send(JSON.stringify(result));
                }
                else {
                    throw new Error("Excercise could not be overwritten");
                }
            });
    }

    public DeleteExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];

        this.repository.Connect()
            .then((connected) => {
                if (!connected) {
                    throw new Error("Connection not established to database");
                }
                return this.repository.Read({ 'id': id });
            })
            .then((data) => {
                if (data.length == 1 && data[0].ExerciseList[index] != undefined) {
                    let list = data[0].ExerciseList;
                    list.splice(index, 1);
                    return this.repository.Update({ 'id': id }, { 'ExerciseList': list });
                }
                else {
                    this.SendNotFoundError(res);
                }
            })
            .then((result) => {
                if (result) {
                    res.status(200);
                    res.send();
                }
                else {
                    throw new Error("Excercise could not be overwritten");
                }
            });
    }

    private CheckPutExerciseData(data: Exercise): boolean {
        let exercise = new Exercise();
        for (let field in exercise) {
            if (data[field] == undefined) {
                return false;
            }
        }
        return true;
    }

    private CheckPatchExerciseData(data: any): boolean {
        let exercise = new Exercise();
        for (let field in data) {
            if (exercise[field] == undefined) {
                return false;
            }
        }
        return true;
    }
}


function CreateController(): WorkoutController {
    return new WorkoutController(GetWorkoutProgramRepo());
}
let WorkoutControllerRoutes = router;

// Root routes
WorkoutControllerRoutes.get('/', (req, res) => {
    CreateController().GetAll(req, res);
})
WorkoutControllerRoutes.get('/:id', (req, res) => {
    CreateController().Get(req, res);
});
WorkoutControllerRoutes.post('/', (req, res) => {
    CreateController().Post(req, res);
});
WorkoutControllerRoutes.put('/:id', (req, res) => {
    CreateController().Put(req, res);
});
WorkoutControllerRoutes.patch('/:id', (req, res) => {
    CreateController().Patch(req, res);
});
WorkoutControllerRoutes.delete('/:id', (req, res) => {
    CreateController().Delete(req, res);
});

// Exercise routes
WorkoutControllerRoutes.get('/:id/exercise/:index', (req, res) => {
    CreateController().GetExercise(req, res);
});
WorkoutControllerRoutes.post('/:id/exercise', (req, res) => {
    CreateController().PostExercise(req, res);
});
WorkoutControllerRoutes.put('/:id/exercise/:index', (req, res) => {
    CreateController().PutExercise(req, res);
});
WorkoutControllerRoutes.patch('/:id/exercise/:index', (req, res) => {
    CreateController().PatchExercise(req, res);
});
WorkoutControllerRoutes.delete('/:id/exercise/:index', (req, res) => {
    CreateController().DeleteExercise(req, res);
});

export { WorkoutControllerRoutes };