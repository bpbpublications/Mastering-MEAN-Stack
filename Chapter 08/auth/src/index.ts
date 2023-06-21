import mongoose from 'mongoose';
import {auth_app} from './app';
const auth_port = process.env.PORT || 3100;

const startup = async()=>{
    if(!process.env.AUTH_JWT_KEY){
        throw new Error('Jwt key must be defined');
    }
    if(!process.env.AUTH_MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    try{
    await mongoose.connect(process.env.AUTH_MONGO_URI);
    console.log('Connected to Mongo DB');
    } catch(err){
        console.error(err);
    }
    
    auth_app.listen(auth_port, ()=>{
    console.log('Listening on port 3100',auth_port);
    });

}
startup();
