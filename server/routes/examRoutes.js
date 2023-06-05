import { Router } from "express";
import { addExam, addSubject, getExams, getSubjects } from "../controllers/ExamControllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router()

router.post('/addexam', verifyToken, addExam)
router.post('/:examid/addsubject', verifyToken, addSubject)
router.get('/:userid/getexams', verifyToken, getExams)
router.get('/:examid', verifyToken, getSubjects)


export default router