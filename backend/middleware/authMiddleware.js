import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";

const protect = asyncHandler(async(req, res, next) => {

    let token = req.cookies.jwt;
    
    console.log(token);

    if(!token){
        res.status(401);
        throw new Error("No auth, no token");
    }

    try{
        const decoded = jwt.verify(token, "qazwsxedcrfv");
        console.log(decoded);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch(err){
        res.status(401);
        console.log(err);
        throw new Error("Not auth, token failed");
    }

})

const admin = (req, res, next) => {

    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("Not as auth admin");
    }

}

export { protect, admin };