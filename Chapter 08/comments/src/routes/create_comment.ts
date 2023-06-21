import express, {Request, Response} from 'express';
import {requireAuth,validateRequest, NotFoundErr} from '@pcblog/common';
import {body} from 'express-validator';
import  mongoose  from 'mongoose';
import {Post} from '../models/posts';

const router=express.Router();

router.post('api/posts/:postid/comments',requireAuth,[body('postId').not().isEmpty().custom((input:string)=>mongoose.Types.ObjectId.isValid(input))
.withMessage('Post Id must be provided'),validateRequest], async(req: Request, res: Response)=>{
        const {postId} = req.body;
        const post = await Post.findById(postId);
        if (!post){
            throw new NotFoundErr();
        } 
});

export {router as createCommentsRouter};