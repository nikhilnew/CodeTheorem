const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project.controller');

// Retrieve all projects
router.get('/getAll', projectController.findAll);

// Create a new projects
router.post('/create', projectController.create);

// Delete a project with id
router.delete('/:Code', projectController.delete);

// // Update a project with id
// router.put('/:id', projectController.update);

// Update a project with project_name
router.put('/:Code', projectController.update);



// Retrieve a single project with id
// router.get('/:id', projectController.findById);
router.get('/:Code', projectController.findById);





module.exports = router;
