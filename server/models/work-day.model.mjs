import mongoose ,{ Schema } from "mongoose";

const schema = new Schema({
    date: Date,
    startWork: Date,
    endWork: Date,
    comment: String,
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

export const WorkDaySchema = mongoose.model("data", schema, "data");
