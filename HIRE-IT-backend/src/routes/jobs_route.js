const express=require('express');
const router=express.Router();
//const userauthentication=require('../middlewares/userauthentication')

const jobcontroller=require('../controllers/jobscontroller');
const checkuser  = require('../validations/uservalidator');

router.get('/',jobcontroller.getJobList);
router.get('/:id',jobcontroller.getJobDetailsById);
router.post('/createjob/:userId',checkuser,jobcontroller.createJob);
router.put('/:userId/:jobId',checkuser,jobcontroller.updateJob);
router.delete('/:userId/:jobId',checkuser,jobcontroller.deleteJob);
module.exports=router;