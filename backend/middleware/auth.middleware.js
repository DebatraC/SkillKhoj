import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: 'No token provided, authorization denied'});
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode; // Attach user info to request object
            console.log("The user is: ", req.user);
            next(); // Call the next middleware or route handler
        } catch(error) {
            res.status(400).json({message: "Token not valid"})
        }
    }
    else {
        return res.status(401).json({message: 'No token, authorization denied'});
    }
}

export default verifyToken
