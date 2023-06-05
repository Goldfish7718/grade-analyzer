import jwt from 'jsonwebtoken';

const generateToken = (id, fname, lname, username) => {
    const payload = {
        id,
        fname,
        lname,
        username
    }
    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1d' })

    return token;
}

export default generateToken;