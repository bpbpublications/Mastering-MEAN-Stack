import express, {Request, Response} from 'express';

const router=express.Router();

router.get('api/posts/:postid/comments', async(req: Request, res: Response)=>{
        res.send({});
});

export {router as indexCommentsRouter};