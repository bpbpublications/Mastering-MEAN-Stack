import mongoose, { Mongoose } from 'mongoose';
import {CommentDoc} from './comment'


interface PostAttribs {
    title: string;
    content: string;
    userId: string;
    comments: CommentDoc;

}

interface PostDoc extends mongoose.Document {
    title: string;
    content: string;
    userId: string;
    comments: CommentDoc;
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
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    }]

    

    
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