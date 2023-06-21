import express from 'express';
import jwt from 'jsonwebtoken'

//import {currentUser} from '@pcblog/common';
import {currentUser} from '@pcblog/common';

const auth_router = express.Router();
auth_router.get('/api/users/currentuser',currentUser,(req,res)=>{
        if (!req.session?.jwt){
                return res.send({currentUser: null})
        }
        try {
        const auth_payload = jwt.verify(req.session.jwt, process.env.AUTH_JWT_KEY!);
        res.send({currentUser: auth_payload});
        } catch(err){
        res.send({currentUser: null});
        }
});

export {auth_router as currentUserRouter};