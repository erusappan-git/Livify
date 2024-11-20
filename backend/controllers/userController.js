import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js"


const authUser = asyncHandler( async (req, res) => {

    // console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){

        const token = jwt.sign({userId:user._id}, "qazwsxedcrfv", {expiresIn:"30d"});

        res.cookie("jwt", token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })

    } else {

        res.status(401);
        throw new Error("Invalid Email or Password");

    }

})

const registerUser = asyncHandler( async (req, res) => {

    const { email, password, name } = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){

        const token = jwt.sign({userId:user._id}, "qazwsxedcrfv", {expiresIn:"30d"});

        res.cookie("jwt", token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })

    } else{
        res.status(400);
        throw new Error("Invalid user data");
    }

})

const logoutUser = asyncHandler( async (req, res) => {

    res.clearCookie("jwt");
    res.status(200).json({message: "Logged out successfully"})

})

const getUserProfile = asyncHandler( async (req, res) => {

    res.send("Get User Profile");

})

const updateUserProfile = asyncHandler( async (req, res) => {

    res.send("Update User Profile");

})

const getUsers = asyncHandler( async (req, res) => {

    res.send("Get User");

})

const getUserById = asyncHandler( async (req, res) => {

    res.send("Get User By ID");

})

const deleteUser = asyncHandler( async (req, res) => {

    res.send("Delete User");

})

const updateUser = asyncHandler( async (req, res) => {

    res.send("Update User");

})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}