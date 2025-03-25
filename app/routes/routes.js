const express = require('express');
const router = express.Router();

const userRoutes = require('./userRouter');
const authRouter = require('./authRouter');

router.use('/users', userRoutes);
router.use('/', authRouter);


module.exports = router;