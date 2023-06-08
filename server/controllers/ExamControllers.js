import Exam from '../models/examSchema.js'
import User from '../models/userSchema.js'
import calcPercent from '../middleware/calcPercent.js'
import calcTotal from '../middleware/calcTotal.js'
import calcTotalMarks from '../middleware/calcTotalMarks.js'


// EXAM CONTROLLERS
export const addExam = async (req, res) => {
    try {
        const { examName, author } = req.body

        const newExam = new Exam({
            examName,
            author
        })
        newExam.save()

        const user = await User.findOne({ username: author })
        user.exams.push(newExam._id)
        user.save()

        res
            .status(200)
            .json({ message: "Added Succesfully" })
    } catch (err) {
        console.log(err);
    }
}

export const getExams = async (req, res) => {
    try {
        const userID = req.params.userid;
        const potentialUser = await User.findOne({ _id: userID })
        
        const exams = []
        const examData = []

        const totalPercentage = []

        const totalAchievable = []
        const totalObtained = []

        if (!potentialUser) {
            return res
                .status(400)
                .json({
                    message: 'User does not exists.'
                })
        }

        if (potentialUser.exams.length === 0)
            return res
                .status(200)
                .json({ 
                    examData
                 })        

        for (let i = 0; i < potentialUser.exams.length; i++) {
            exams.push(potentialUser.exams[i]._id)
        }

        for (let i = 0; i < exams.length; i++) {
            const examDataSet = await Exam.findOne({ _id: exams[i] })
            examData.push(examDataSet)
        }

        for (let i = 0; i < examData.length; i++) {
            const totalPercent = calcTotal(examData[i].subjects)
            totalPercentage.push(totalPercent)

            if (examData[i].subjects.length > 0) {
                const total = calcTotalMarks(examData[i].subjects)

                totalAchievable.push(total.totalAchievable)
                totalObtained.push(total.totalObtained)
            } else {
                totalAchievable.push("N/A")
                totalObtained.push("N/A")
            }
        }

        res.json({
            examData,
            totalPercentage,
            totalAchievable,
            totalObtained
        })
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Oops! An error Occured!"
            })

        console.log(err);
    }
}

export const updateExam = async (req, res) => {
    try {
        const examID = req.params.examid
        const { newName } = req.body

        await Exam.findOneAndUpdate({ _id: examID }, { examName: newName })

        res
            .status(200)
            .json({ message: "Updated Succesfully" })
    } catch (err) {
        console.log(err);
    }
}

export const deleteExam = async (req, res) => {
    try {
        const examID = req.params.examid
        const exam = await Exam.findById(examID)
        const { author } = exam

        await Exam.findOneAndRemove({ _id: examID })
        await User.findOneAndUpdate(
            { username: author },
            { $pull: {exams: { _id: examID } }},
            { new: true }
        )

        res
            .status(200)
            .json({ message: "Deleted succesfully" })
    } catch (err) {
        console.log(err);
    }
}

// SUBJECT CONTROLLERS
export const addSubject = async (req, res) => {
    try {
        const examID = req.params.examid
        const {
            subjectName,
            achievableScore,
            obtainedScore
        } = req.body

        const exam = await Exam.findOne({ _id: examID })
        const percentage = calcPercent(achievableScore, obtainedScore)
         
        const subject = {
            subjectName,
            achievableScore,
            obtainedScore,
            percentage
        }

        exam.subjects.push(subject)
        exam.save()

        res
            .status(200)
            .json({ subject })
    } catch (err) {
        console.log(err);
    }
}

export const getSubjects = async (req, res) => {
    try {
        const examID = req.params.examid

        const exam = await Exam.findOne({ _id: examID })

        if (!exam)
            return res
                .status(400)
                .json({ message: 'No exam found with given ID' })

        const { subjects, examName } = exam
        res
            .status(200)
            .json({ subjects, examName })
    } catch (err) {
        console.log(err);
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const examID = req.params.examid
        const subjectID = req.params.subjectid

        const exam = await Exam.findOneAndUpdate(
            { _id: examID},
            { $pull: {subjects: { _id: subjectID } } },
            { new: true }
            )

        res
            .status(200)
            .json(exam.subjects)
        
    } catch (err) {
        console.log(err);
    }
}

export const updateSubject = async (req, res) => {
    try {
        const examID = req.params.examid
        const subjectID = req.params.subjectid
        
        const { updatedFields, updatedValues } = req.body
        let exam;

        for (let i = 0; i < updatedFields.length; i++) {
            exam = await Exam.findOneAndUpdate(
                { _id: examID, "subjects._id": subjectID },
                { $set: { [`subjects.$.${updatedFields[i]}`]: updatedValues[i] } },
                { new: true }
                );
        }

        const subject = exam.subjects.find(subject => subject._id == subjectID)
        subject.percentage = calcPercent(subject.achievableScore, subject.obtainedScore)

        await exam.save()

        res
            .status(200)
            .json({ message: "Updated Succesfully" })

    } catch (err) {
        console.log(err);
    }
}