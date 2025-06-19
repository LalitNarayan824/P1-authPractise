import express from "express";
import { isAuthenticated, login, logout, register, sendResetPasswordOtp, sendVerifyOtp, verifyEmail, verifyResetPasswordOtp } from "../controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router()

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userAuth , logout);
authRouter.post('/send-verify-otp', userAuth , sendVerifyOtp);
authRouter.post('/verify-email', userAuth , verifyEmail);
authRouter.get('/is-auth' , userAuth , isAuthenticated)
authRouter.post('/send-reset-otp' ,  sendResetPasswordOtp)
authRouter.post('/reset-password' ,  verifyResetPasswordOtp)


export default authRouter;