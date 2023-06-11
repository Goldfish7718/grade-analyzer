import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    examName: { 
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String,
        ref: 'User'
    },
    subjects: [
        {
            subjectName: String,
            achievableScore: Number,
            obtainedScore: Number,
            percentage: Number
        }
    ]
})

const Exam = new mongoose.model('Exam', examSchema)
export default Exam