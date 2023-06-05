import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) { 
        return res
            .status(401)
            .json({
            message: '401 Unauthorized'
        })   
    }

    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!decode.isAdmin) {
        return res
            .status(403)
            .json({ message: 'You are forbidden from accesing this page' })
    }
    
    req.decode = decode
    next()

    } catch (err) {
        if(err.message === 'invalid token' || err.message === 'jwt malformed') {
            res.status(400).json({
                message: 'Authentication Failed'
            })
        } else {
            res.status(500).json({
                message: '500 Internal Server Error'
            })
        }

    }
}

export default verifyAdmin;