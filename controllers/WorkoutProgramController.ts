import { APIControllerBase } from './APIControllerBase';
var express = require('express');
var router = express.Router();

export class WorkoutController extends APIControllerBase  {
    public Get(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        throw new Error("Not implemented");
        /*
        let foundData = this.exampleData.find((val) => val.id == id);
        if (foundData) {
            res.send(JSON.stringify(foundData));
        }
        else {
            this.SendNotFoundError(res);
        }
        */
    }

    public Post(req, res): void {
        this.SetHeaders(res);
        throw new Error("Not implemented");
        /*
        let id = this.exampleData[this.exampleData.length - 1].id + 1;
        let index = this.exampleData.push({ id: id, data: "Example" });
        res.location(req.get('host') + req.baseUrl + '/' + id);
        res.status(200);
        res.send(JSON.stringify(this.exampleData[index]));
        */
    }

    public Put(req, res): void {
        throw new Error("Not implemented");
        /*
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }
        // Guards against wrong data
        if (!this.CheckData(req)) {
            this.SendWrongDataError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];

        let foundData = this.exampleData.find((val) => val.id == id);
        if (foundData) {
            let data = req.body.data;
            foundData.data = data;
            res.status(200);
            res.send(JSON.stringify(foundData));
        }
        else {
            this.SendNotFoundError(res);
        }
        */
    }

    public Patch(req, res): void {
        throw new Error("Not implemented");
        /*
        // Guards against wrong content types
        if (!this.CheckContentType(req)) {
            this.SendWrongContentTypeError(res);
            return;
        }

        this.SetHeaders(res);
        let id = req.params['id'];
        let foundData = this.exampleData.find((val) => val.id == id);
        if (foundData) {
            let data = req.body.data;
            foundData.data = data != undefined ? data : foundData.data;
            res.status(200);
            res.send(JSON.stringify(foundData));
        }
        else {
            this.SendNotFoundError(res);
        }
        */
    }

    public Delete(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        throw new Error("Not implemented");
        /*
        let i = -1;
        let foundData = this.exampleData.find((val, index) => {
            i = index;
            return val.id == id;
        });
        if (foundData) {
            this.exampleData.splice(i, 1);
            res.status(200);
            res.send("");
        }
        else {
            this.SendNotFoundError(res);
        }
        */
    }
    public GetExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];
        throw new Error("Not implemented");
    }

    public PostExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];
        throw new Error("Not implemented");
    }

    public PutExercise(req, res): void {
        throw new Error("Not implemented");
    }

    public PatchExercise(req, res): void {
        throw new Error("Not implemented");
    }

    public DeleteExercise(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let index = req.params['index'];
        throw new Error("Not implemented");
    }
}

let Controller = new WorkoutController();
let WorkoutControllerRoutes = router;

// Root routes
WorkoutControllerRoutes.get('/:id', (req, res) => {
    Controller.Get(req, res);
});
WorkoutControllerRoutes.post('/', (req, res) => {
    Controller.Post(req, res);
});
WorkoutControllerRoutes.put('/:id', (req, res) => {
    Controller.Put(req, res);
});
WorkoutControllerRoutes.patch('/:id', (req, res) => {
    Controller.Patch(req, res);
});
WorkoutControllerRoutes.delete('/:id', (req, res) => {
    Controller.Delete(req, res);
});

// Exercise routes
WorkoutControllerRoutes.get('/:id/exercise/:index', (req, res) => {
    Controller.GetExercise(req, res);
});
WorkoutControllerRoutes.post('/:id/exercise', (req, res) => {
    Controller.PostExercise(req, res);
});
WorkoutControllerRoutes.put('/:id/exercise/:index', (req, res) => {
    Controller.PutExercise(req, res);
});
WorkoutControllerRoutes.patch('/:id/exercise/:index', (req, res) => {
    Controller.PatchExercise(req, res);
});
WorkoutControllerRoutes.delete('/:id/exercise/:index', (req, res) => {
    Controller.DeleteExercise(req, res);
});

export { WorkoutControllerRoutes };