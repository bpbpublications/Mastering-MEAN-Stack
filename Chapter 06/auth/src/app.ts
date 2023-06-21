import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr} from '@pcblog/common';

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';
import {signupRouter} from './routes/signup';
import {profileRouter} from './routes/profile';

const auth_app=express();
auth_app.set('trust proxy', true);

auth_app.use(json());
auth_app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
})
);

auth_app.use(currentUserRouter);
auth_app.use(signinRouter);
auth_app.use(signoutRouter);
auth_app.use(signupRouter);
auth_app.use(profileRouter);

auth_app.all('*',async(req,res)=>{
    throw new NotFoundErr();
});
auth_app.use(errorHandler);
//console.log('tichyayla')
export {auth_app};