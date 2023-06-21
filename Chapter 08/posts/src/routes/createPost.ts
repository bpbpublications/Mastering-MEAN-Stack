import express from 'express';
import {Request, Response} from "express";
import {body} from 'express-validator';
import {requireAuth, validateRequest, NotFoundErr} from '@pcblog/common';
import {Post} from '../models/posts';
import {Comment} from '../models/comment';
import {PostCreatedPublisher} from '../events/publishers/post-created-publisher';
import {natsWrapper} from '../nats-wrapper';


const createpost_router = express.Router();

createpost_router.post('/api/posts',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('content').not().isEmpty().withMessage('Content is required')
    
],validateRequest,async (req : Request,res : Response) => 
    {
        const {title,content,comments}=req.body;
        console.log('ye ppa',comments[0]);

        const commentB = Comment.build({
            content: req.body.comments[0].content,
            createdDt: req.body.comments[0].createdDt
        });
        console.log('This is commentB',commentB);
      //  comment.save(commentB).then(function(err,data) {
      //      console.log('this is saved: ',data)
      //  });
      //  const Comment1 = comment.findById(commentB._id);
      //  console.debug('Built comment',Comment1._id);
        
        const post = Post.build({
            title,
            content,
            userId: req.currentUser!.id,
			comments: commentB
        });
        //post.comment._id=commentB._id
        
        //console.log('Post after build',post);
        
        //console.debug('Extracted comment:',post.comments);
        await commentB.save(function(err,data){
            console.log('Saved data',data)
        });
        await post.save(function(err,data){
            console.log('Saved data',data)
        });
        new PostCreatedPublisher(natsWrapper.client).publish({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId
        });
        console.log('Post before send',post.comments[0]);
        //post.comments[0]
        res.status(201).send(post);
        
//        res.sendStatus(200);
    });

export {createpost_router as createPostRouter};