import express, {Request, Response} from 'express';

const router=express.Router();

router.get('api/posts/:postId/comments/:commentId', async(req: Request, res: Response)=>{
        res.send({});
});

export {router as displayCommentsRouter};