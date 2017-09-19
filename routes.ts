var express = require('express');
var router = express.Router();

import { ExampleControllerRoutes } from './controllers/ExampleWebApi';
import { WorkoutControllerRoutes } from './controllers/WorkoutProgramController';

/* Example web api controller*/
router.use('/example', ExampleControllerRoutes);
router.use('/api/workoutprogram', WorkoutControllerRoutes);

export = router;
