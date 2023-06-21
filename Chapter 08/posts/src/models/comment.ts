import mongoose, { Mongoose } from 'mongoose';


interface CommentAttribs {
    content: string;
    createdDt: Date;
}

export interface CommentDoc extends mongoose.Document {
    content: string;
    createdDt: Date;
 }

interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attribs:CommentAttribs): CommentDoc
    
}

const commentSchema = new mongoose.Schema ({
    content: {
        type: String,
        required: true

    },

    createdDt: {
        type: Date,
        required: true

    },

    
}, {
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

commentSchema.statics.build = (attribs: CommentAttribs)=>{
    return new Comment(attribs);
};

const Comment = mongoose.model<CommentDoc,CommentModel>('Comment',commentSchema);

export {Comment};