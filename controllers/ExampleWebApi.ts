import { APIControllerBase } from './APIControllerBase';
var express = require('express');
var router = express.Router();

export class ExampleController extends APIControllerBase {
    exampleData: any[] = [
        { id: 1, data: "Example Data" },
        { id: 2, data: "John Hitler" },
        { id: 3, data: "Sausage Party" },
        { id: 4, data: "hurh durh" },
        { id: 5, data: "bob the builder" },
        { id: 6, data: "numse leg" },
        { id: 7, data: "JOHN CENA, DUDHU DUH UDUHU" },
        { id: 8, data: "Kartoffel" },
    ];

    public Get(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];
        let foundData = this.exampleData.find((val) => val.id == id);
        if (foundData) {
            res.send(JSON.stringify(foundData));
        }
        else {
            this.SendNotFoundError(res);
        }
    }

    public Post(req, res): void {
        this.SetHeaders(res);
        let id = this.exampleData[this.exampleData.length - 1].id + 1;
        let index = this.exampleData.push({ id: id, data: "Example" });
        res.location(req.get('host') + req.baseUrl + '/' + id);
        res.status(200);
        res.send(JSON.stringify(this.exampleData[index]));
    }

    public Put(req, res): void {
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
    }

    public Patch(req, res): void {
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
    }

    public Delete(req, res): void {
        this.SetHeaders(res);
        let id = req.params['id'];

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
    }

    private CheckData(req): boolean {
        return typeof req.body.data == 'string';
    }
}

let Controller = new ExampleController();
let ExampleControllerRoutes = router;

// /example/
ExampleControllerRoutes.get('/:id', (req, res) => {
    Controller.Get(req, res);
});
ExampleControllerRoutes.post('/', (req, res) => {
    Controller.Post(req, res);
});
ExampleControllerRoutes.put('/:id', (req, res) => {
    Controller.Put(req, res);
});
ExampleControllerRoutes.patch('/:id', (req, res) => {
    Controller.Patch(req, res);
});
ExampleControllerRoutes.delete('/:id', (req, res) => {
    Controller.Delete(req, res);
});

export { ExampleControllerRoutes };