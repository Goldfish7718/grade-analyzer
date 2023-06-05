import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    exams: [
        {
            exam_id: {
                type: Schema.Types.ObjectId,
                ref: 'Exam'
            }
        }
    ]
})

const User = mongoose.model('User', userSchema);

export default User;