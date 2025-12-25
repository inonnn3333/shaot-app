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

schema.index({ date: 1, userId: 1 }, { unique: true });
export const WorkDaySchema = mongoose.model("data", schema, "data");
