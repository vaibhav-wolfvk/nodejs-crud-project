const express =require('express')
const User =require('../models/user_model')
const auth =require('../middleware/auth')
const {body} = require('express-validator')
const userController=require('../controllers/user')
const router= express.Router()

router.put('/signup',[body('email')
                    .isEmail()
                    .withMessage('enter a valid email.')
                    .custom((value,{req})=>
                    { return User.findOne({email: value})
                                .then(result=> {
                                if(result){
                                 return Promise.reject('Email already registered')
                                }
                    })
                    })
                    .normalizeEmail(),
                    body('password')
                    .trim()
                    .isLength({min: 5}),
                    body('name')
                    .trim()
                    .not()
                    .isEmpty()
                ],userController.signup
          )

router.post('/login',userController.login)
router.get('/status',auth,userController.getUserStatus)
router.patch('/status',auth,
              [ body('status')
               .trim()
               .not()
               .isEmpty()
            ],
              userController.updateUserStatus )
module.exports= router