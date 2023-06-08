import { Router } from "express";
import { addExam, addSubject, deleteExam, deleteSubject, getExams, getSubjects, updateExam, updateSubject } from "../controllers/ExamControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router()

router.post('/addexam', verifyToken, addExam)
router.post('/:examid/addsubject', verifyToken, addSubject)

router.get('/:userid/getexams', verifyToken, getExams)
router.get('/:examid', verifyToken, getSubjects)

router.delete('/deletesub/:examid/:subjectid', verifyToken, deleteSubject)
router.delete('/deleteexam/:examid', verifyToken, deleteExam)

router.patch('/updatesub/:examid/:subjectid', verifyToken,updateSubject)
router.patch('/updateexam/:examid', verifyToken, updateExam)

export default router