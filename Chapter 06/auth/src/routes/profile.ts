const express = require('express')
import {Request,Response} from 'express';
import {body} from 'express-validator';
import jwt  from 'jsonwebtoken';
import {validateRequest, BadRequestErr, currentUser, requireAuth} from '@pcblog/common';
import {User} from '../models/user'

const auth_router = express.Router();

auth_router.get('/api/users/profile',currentUser,async (req: Request,res: Response)=>{
    await res.send('test');
});


export {auth_router as profileRouter};