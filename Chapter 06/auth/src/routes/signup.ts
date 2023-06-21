const express = require('express');

import {Request,Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';
import {validateRequest,BadRequestErr} from '@pcblog/common';
import {User} from '../models/user'

const auth_router = express.Router();
auth_router.post('/api/users/signup',[
    body('auth_email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('auth_password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],
    validateRequest,

    async(req: Request,res: Response)=>{

    //const errors = validationResult(req);

    //if (!errors.isEmpty()){
    //    throw new RequestValidationErr(errors.array());
    //}

    const {auth_email,auth_password} = req.body;
    console.log(auth_email);
    
    const existingUser = await User.findOne({auth_email});

    if (existingUser){
       throw new BadRequestErr('Email is in use');
    }
    
    const user = User.build({
        auth_email,auth_password
    })
    console.log('before saving user',user);
    await user.save();


    const userJwt = jwt.sign({
        id: user.id,
        auth_email: user.auth_email
    },
        process.env.AUTH_JWT_KEY!
    );

    req.session = {
        jwt: userJwt
    };
    res.status(201).send(user);
});

export {auth_router as signupRouter};