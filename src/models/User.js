import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

const UserModel = mongoose.model('User', schema);

export default UserModel;