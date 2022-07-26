import User from "../models/User";
import jwt from "jsonwebtoken"
 const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await User.findOne({ token: token });
        if(!user) return res.sendStatus(403);
        jwt.verify(token, process.env.REFRESH_TOKEN, (err, decoded) => {
            if(err) return res.json({msg:"refresh token expire"});
            const userId = user.id;
            const name = user.username;
            const email = user.email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN,{
                expiresIn: '20s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}
export default refreshToken