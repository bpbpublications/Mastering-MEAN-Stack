import express, {Request, Response} from 'express';
import {NotFoundErr} from '@pcblog/common';
import {Post} from '../models/posts';

const showpost_router = express.Router();

showpost_router.get('/api/posts/:id',async (req: Request,res: Response) => {
    const post = await Post.findById(req.params.id);
    if (!post){
        throw new NotFoundErr();
    }
    res.send(post);
});

export {showpost_router as showPostsRouter}; 