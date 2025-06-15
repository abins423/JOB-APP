const express=require('express')
const router=express.Router()
const usercontroller=require('../controllers/usercontrol');
 const userautherisation=require('../middlewares/userauthorisation')

router.get('/',usercontroller.getUsers);
router.get('/:id',usercontroller.getUserById);
router.post('/register',usercontroller.registerUser);
router.post('/login',userautherisation,usercontroller.loginUser);
router.put('/:id',usercontroller.updateUser);
router.delete('/:id',usercontroller.deleteUser);
module.exports=router;