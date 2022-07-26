
//  export const router=require("express").Router()
const express =require( "express");
const router= express.Router()
const { verifyToken } = require('../middleware/verfifyToken')
const {register,login,getUserData,logout } =require('../controller/user');
const { refreshToken } = require("../controller/RefreshToken");
// const { accessToken, refreshToken } = require("../utils/utils");

router.post("/register",register)
router.post("/login",login)
router.delete("/logout",logout)
router.delete("/token",refreshToken)
router.get("/getUserData",verifyToken,getUserData)
module.exports= router