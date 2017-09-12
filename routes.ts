var express = require('express');
var router = express.Router();

import { ExampleControllerRoutes } from './controllers/ExampleWebApi';

/* Example web api controller*/
router.use('/example', ExampleControllerRoutes);

export = router;
