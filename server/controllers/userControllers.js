import User from '../models/userSchema.js'
import bcrypt from 'bcrypt';
import generateToken from '../middleware/generateToken.js'

export const loginUser = async (req, res) => {

    try {
    const {
        username, 
        password
    } = req.body;

    //INPUT VALIDATION
    const emptyCondition = !username || !password

    if (emptyCondition) {
        return res
            .status(400)
            .json({
                message: 'All input fields are required'
            })
    }

    const potentialUser = await User.findOne({ username })

    if (!potentialUser) {
        return res
            .status(400)
            .json({
                message: 'User does not exists.'
            })
    }

    const isMatch = await bcrypt.compare(password, potentialUser.password);

    if(!isMatch) {
        return res
            .status(400)
            .json({
                message: 'Incorrect Credentials'
            })
    }

    const token = generateToken(potentialUser._id, potentialUser.fName, potentialUser.lName, username);
    res.json({ token });
        
    } catch (err) {
        res
            .status(500)
            .json({
              message: "Internal Server Error"
            })
    }
}

export const signupUser = async (req, res) => {

    try {
    const {
        fName,
        lName,
        username, 
        password
    } = req.body;

    const emptyCondition = !username || !password || !fName || !lName

    if (emptyCondition) {
        return res
            .status(400)
            .json({
                message: 'All input fields are required'
            })
    }

    const potentialUser = await User.findOne({ username })

    if (potentialUser) {
        return res
            .status(400)
            .json({
                message: 'User already Exists'
            })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        fName,
        lName,
        username,
        password: hashedPassword
    })

    await newUser.save();

    const token = generateToken(newUser._id, fName, lName, username);
    
    res
        .status(200)
        .json({
            token
        })

    } catch (err) {
        res
            .status(500)
            .json({
                message: "Internal Server Error"
            })
    }
}