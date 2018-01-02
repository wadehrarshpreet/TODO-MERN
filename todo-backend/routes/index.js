const express = require('express');
const router = express.Router();
const Controller = require('../controller');
// define the home page route
router.post('/add', Controller.ADDTODO);
router.put('/done/:id', Controller.DONETODO);
router.get('/todo/:uid', Controller.LISTTODO)
module.exports = router;
