var express = require('express');
var router = express.Router();

export class APIControllerBase {
    protected SetHeaders(res): void {
        res.setHeader('Content-Type', 'application/json');
    }

    protected CheckContentType(req): boolean {
        return req.get('Content-Type') == 'application/json';
    }

    protected SendWrongContentTypeError(res): void {
        this.SetHeaders(res);
        res.status(500);
        res.send(JSON.stringify({ err: 'Content type not JSON' }));
    }

    protected SendWrongDataError(res): void {
        res.status(500);
        res.send(JSON.stringify({ err: 'Sent data is incorrect' }));
    }

    protected SendNotFoundError(res): void {
        res.status(404);
        res.send(JSON.stringify({ err: 'Not found' }));
    }
}