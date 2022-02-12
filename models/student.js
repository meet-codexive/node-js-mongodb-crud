import mongoose from "mongoose";
const Schema = mongoose.Schema;


const studSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Student', studSchema, 'students') //students table name