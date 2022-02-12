import mongoose from "mongoose";
import customer from "./customer";
const Schema = mongoose.Schema;

const IdentifierSchema = new Schema({
    cardCode: {
        type: String
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    }
})

export default mongoose.model('Identifier', IdentifierSchema, 'identifier')