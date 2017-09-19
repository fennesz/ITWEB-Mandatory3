var express = require('express');
var router = express.Router();

import { WorkoutControllerRoutes } from './controllers/WorkoutProgramController';

/* Example web api controller*/
router.use('/api/workoutprogram', WorkoutControllerRoutes);

export = router;
