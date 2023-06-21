import express,{Request,Response} from 'express';
import {Post} from '../models/posts';


const indexpost_router =express.Router();
indexpost_router.get('/api/posts', async (req: Request,res:Response) => {
    const posts = await Post.find({});
    res.send(posts);
});

export {indexpost_router as indexPostRouter};