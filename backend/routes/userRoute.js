const express = require('express');
const router = express.Router();

const {signUp, healthCheck} = require('../controllers/User/SignUp')
const {signIn} = require('../controllers/User/SignIn')
const {auth, isUser, isAdmin} = require('../middleware/Auth');
const {updateUser, fetchAllUserInfo, deleteUser} = require('../controllers/User/userController')

router.post('/sign-up',signUp);
router.get('/health-check',healthCheck)
router.post('/sign-in',signIn)
router.put('/update-user',auth,isUser,updateUser);
router.delete('/delete-user/:id',auth,isAdmin,deleteUser);
router.get('/fetch-all-users',auth,isAdmin,fetchAllUserInfo);

// router.post('/auth',auth,(req,res)=>{
//     return res.status(200).json({
//         succes: true,
//         msg : "verified user !!"
//     })
// })

 router.post('/isUser',auth,isUser);
 router.post('/isAdmin',auth,isAdmin,(req,res)=>{

    return res.status(200).json({
        succes: true,
        msg : "verified user !!"
    }
)
 });

module.exports = router;