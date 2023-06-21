import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr,currentUser} from '@pcblog/common';

import {createCommentsRouter} from './routes/create_comment';
import {indexCommentsRouter} from './routes/index';
import {displayCommentsRouter} from './routes/display_comment';
import {deleteCommentsRouter} from './routes/delete_comments';

const post_app=express();
post_app.set('trust proxy', true);

post_app.use(json());
post_app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
})
);

post_app.use(currentUser);
post_app.use(createCommentsRouter);
post_app.use(indexCommentsRouter);
post_app.use(displayCommentsRouter);
post_app.use(deleteCommentsRouter);

post_app.all('*',async(req,res)=>{
    throw new NotFoundErr();
});
post_app.use(errorHandler);
console.log('tichyayla')
export {post_app};