const isAdmin = ( req:any, res:any, next:any) =>{
    try {
        console.log("Local values from auth middleware" + JSON.stringify(res.locals.user));
        if (res.locals.user.roles && res.locals.user.roles.indexOf("admin") != -1) {
            next();
        }else{
            console.log("Not admin");
            return res.status(500).json("You are not authorized check your role");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("You are not authorized check your role");
    }
}

export default isAdmin