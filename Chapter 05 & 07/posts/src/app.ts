import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr,currentUser} from '@pcblog/common';

import {createPostRouter} from './routes/createPost';
import {indexPostRouter} from './routes/index';
import {showPostsRouter} from './routes/showPosts';
import {updatePostRouter} from './routes/update';

const post_app=express();
post_app.set('trust proxy', true);

post_app.use(json());
post_app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
})
);

post_app.use(currentUser);
post_app.use(createPostRouter);
post_app.use(indexPostRouter);
post_app.use(showPostsRouter);
post_app.use(updatePostRouter);

post_app.all('*',async(req,res)=>{
    throw new NotFoundErr();
});
post_app.use(errorHandler);
console.log('tichyayla')
export {post_app};