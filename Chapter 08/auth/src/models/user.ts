//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import {Password} from '../services/password';

interface UserAttribs{
    auth_email:string;
    auth_password:string;

}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attribs: UserAttribs):UserDoc;
}

interface UserDoc extends mongoose.Document {
    auth_email: string;
    auth_password: string;
}
const userSchema = new mongoose.Schema({
 auth_email:{
     type:String,
     required: true
    },    
 auth_password:{
     type:String,
     required: true
    }    
 
    
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.auth_password;
            delete ret.__v;

        }
    }
});

userSchema.pre('save',async function(done){
    if (this.isModified('auth_password')){
        const hashed = await Password.toHash(this.get('auth_password'));
        this.set('auth_password',hashed);
    }
    done();
});
userSchema.statics.build = (attribs:UserAttribs)=>{
    return new User(attribs);
}
const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

export { User};