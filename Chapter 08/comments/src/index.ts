import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import {natsWrapper} from './nats-wrapper'
import {post_app} from './app';


const post_startup = async()=>{
    if(!process.env.AUTH_JWT_KEY){
        throw new Error('Jwt key must be defined');
    }

    if(!process.env.POSTS_MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    if(!process.env.POSTS_NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if(!process.env.POSTS_NATS_URL){
        throw new Error('NATS_URL must be defined');
    }
    if(!process.env.POSTS_NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try{
        await natsWrapper.connect(process.env.POSTS_NATS_CLUSTER_ID,process.env.POSTS_NATS_CLIENT_ID,process.env.POSTS_NATS_URL);
        natsWrapper.client.on('close',()=>{
            console.log('NATS connection closed!');
            process.exit();
        });

        process.on('SIGINT',()=>natsWrapper.client.close());
        process.on('SIGTERM',()=>natsWrapper.client.close());

    await mongoose.connect(process.env.POSTS_MONGO_URI);
    console.log('Connected to Mongo DB');
    } catch(err){
        console.error(err);
    }
    post_app.listen(3100, ()=>{
    console.log('Listening on port 3100');
    });

}
post_startup();
