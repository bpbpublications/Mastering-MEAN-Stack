import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import {
    validateRequest,
    NotFoundErr,
    requireAuth,
    NotAuthErr
} from '@pcblog/common';
import {Post} from '../models/posts';
import {Comment} from '../models/comment';
import {PostUpdatedPublisher} from '../events/publishers/post-updated-publisher';
import {natsWrapper} from '../nats-wrapper';

const updatepost_router = express.Router();
//console.log('/api/posts/:id');
updatepost_router.put('/api/posts/:id',requireAuth, 
[
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('content')
    .not()
    .isEmpty()
    .withMessage('Content is required')
],
validateRequest,
async (req: Request,res: Response)=>{
//    console.log('are id ye hai'+req.params.id);
    const post_entry = await Post.findById(req.params.id);
    console.log('post_entry'+post_entry);
    if (!post_entry) {
      //  console.log('I am throwing exception');
        //const calci = 
        throw new NotFoundErr();
       // console.log(calci);
    }
  //  console.log('I am after exception');
    if (post_entry.userId !== req.currentUser!.id) {
        throw new NotAuthErr();
    }
    const commentB = Comment.build({
        content: req.body.comments[0].content,
        createdDt: req.body.comments[0].createdDt
    });
    post_entry.set({
        title: req.body.title,
        content: req.body.content,
        comments: commentB
            });

    await commentB.save();        
    await post_entry.save();
    new PostUpdatedPublisher(natsWrapper.client).publish({
        id:post_entry.id,
        title:post_entry.title,
        content: post_entry.content,
        userId: post_entry.userId
        
    });
    res.send(post_entry);
});
export {updatepost_router as updatePostRouter};