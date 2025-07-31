const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(allowedRoles.includes(req.user.role)) {
            next(); // User has the required role, proceed to the next middleware or route handler
        } else {
            res.status(403).json({message: "You do not have permission to access this resource."});
        }
    }
}

export default authorizeRoles;