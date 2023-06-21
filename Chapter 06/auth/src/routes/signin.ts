const express = require('express')
import {Request,Response} from 'express';
import {body} from 'express-validator';
import jwt  from 'jsonwebtoken';
import {validateRequest, BadRequestErr} from '@pcblog/common';
import {User} from '../models/user'
import {Password} from '../services/password';
const auth_router = express.Router();
auth_router.post('/api/users/signin',[
    body('auth_email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('auth_password')
    .trim()
    .notEmpty()
    .withMessage('You must supply password')
]
,validateRequest,
async (req: Request,res: Response)=>{
    const {auth_email,auth_password} = req.body;
    console.log('I am before throwing',req.body);
    const existingUsr = await User.findOne({auth_email});
    console.log('after finding user',existingUsr);
    if (!existingUsr){
        throw new BadRequestErr('Invalid Credentials');
    }
    console.log('I am after throwing');
    const passwordsMatching = await Password.comparePass(
        existingUsr.auth_password,
        auth_password
    );
    if (!passwordsMatching){
        throw new BadRequestErr('Invalid Credentials');
    }
    // const errors = validationResult(req);

    //if (!errors.isEmpty()){
    //    throw new RequestValidationErr(errors.array());
    //}

     const userJwt = jwt.sign({
        id: existingUsr.id,
        auth_email: existingUsr.auth_email
    },
        process.env.AUTH_JWT_KEY!
    );

    req.session = {
        jwt: userJwt
    };
    res.status(200).send(existingUsr);
   }
);

export {auth_router as signinRouter};