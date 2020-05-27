const allowPrivileged = (role: String) => {
    const allowed = (req: any, res: any, next: any) => {
        try {
            console.log("Local values from auth middleware" + JSON.stringify(res.locals.user));
            if (res.locals.user.roles && res.locals.user.roles.indexOf(role) != -1) {
                next();
            } else {
                console.log("Unauthorized attempt made by ", res.locals.user.username);
                return res.status(401).json({"message":"You are not authorized check your role"});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message":"You are not authorized check your role"});
        }
    }
    return allowed;
}
export default allowPrivileged