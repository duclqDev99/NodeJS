const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.get('/', UserController.index);
router.post('/', UserController.create);
router.put('/:id', UserController.update);

module.exports = router;