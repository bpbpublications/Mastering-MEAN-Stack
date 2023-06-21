import mongoose from 'mongoose';
interface commentAttrs {
    userId: string;
    content: string;
}

export interface commentDoc extends mongoose.Document {
    userId: string;
    content: string;
}

interface commentModel extends mongoose.Model<commentDoc> {
    build(attrs: commentAttrs): commentDoc;
}

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});