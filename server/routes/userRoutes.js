import express from 'express';
import { deleteUser, loginUser, signupUser } from '../controllers/userControllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

router.get('/verify', verifyToken, (req, res) => {
    const { decode } = req
    res.json({ decode })
})

router.delete('/delete/:userid', deleteUser)

export default router;