import mongoose from "mongoose";
const Schema = mongoose.Schema;

const domeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    living: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

export default mongoose.model('Demo', domeSchema, 'demos')

