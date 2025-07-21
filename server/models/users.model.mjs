import mongoose, {Schema} from "mongoose";

const FullName = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});


const userSchema = new Schema({
    name: FullName,
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}); 

export const UserSchema = mongoose.model("users", userSchema, "users");