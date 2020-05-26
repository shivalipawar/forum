import config from "../config/index";
import jwt from 'jsonwebtoken';

const checkAuth = ( req:any, res:any, next:any) =>{
    try {
        const payload:any = jwt.verify(req.headers.jwt, config.jwtSecret);
        const user = {
            username : payload.username,
            userid : payload.userid,
            roles : payload.roles
        }
        res.locals.user = user;
        console.log("verified jwt token");
        next();
    } catch (error) {
        console.log(error);
        if (error.name == 'TokenExpiredError') {
            return res.status(401).json({ message: "Jwt is expired!" });
        } else if (error.name == 'JsonWebTokenError') {
            return res.status(401).json({ message: "Jwt is malformed!" });
        }
        return res.status(401).json({ message: "Auth failed!" });  
    }
}

export default checkAuth