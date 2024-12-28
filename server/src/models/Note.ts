import mongoose, { Schema, Document, Types } from 'mongoose';


export interface INote extends Document {
    content: string;
    task: Types.ObjectId;
    createdBy: Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
    content: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Task'
    }
}, { timestamps: true });

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note