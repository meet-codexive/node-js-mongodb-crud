import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
}, { timestamps: true })
export default mongoose.model('Customer', customerSchema, 'customers');

