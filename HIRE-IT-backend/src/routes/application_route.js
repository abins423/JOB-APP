const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/userauthentication');
const applicationController = require('../controllers/applicationcontroller');


router.get('/:jobId', applicationController.getApplicationById);  
router.post('/:userId/:jobId', authenticateUser,applicationController.newApplication);
router.put('/:id', authenticateUser, applicationController.updateApplication);
router.delete('/:id', authenticateUser, applicationController.removeApplication);

module.exports = router;
