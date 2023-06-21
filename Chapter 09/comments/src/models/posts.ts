import mongoose, { Mongoose } from 'mongoose';
import {commentDoc} from './comment'


interface PostAttribs {
    title: string;
    content: string;
    userId: string;
    comment: commentDoc;
}

interface PostDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    comment: commentDoc;
 }

interface PostModel extends mongoose.Model<PostDoc> {
    build(attribs:PostAttribs): PostDoc
    
}

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true

    },

    content: {
        type: String,
        required: true

    },
    userId: {
        type: String,
        required: true

    },
    comment: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }

    
}, {
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

postSchema.statics.build = (attribs: PostAttribs)=>{
    return new Post(attribs);
};

const Post = mongoose.model<PostDoc,PostModel>('Post',postSchema);

export {Post};