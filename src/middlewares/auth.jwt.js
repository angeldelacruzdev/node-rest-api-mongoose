import jwt from 'jsonwebtoken'
import Role from '../models/Role';
import User from '../models/User';

require('dotenv').config();

export const verifyToken = async (req, res, next) => {

    try {

        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({
            message: "No token provider"
        })

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decoded.id;

        const userExist = await User.findById(req.userId, {
            password: 0
        });
        if (!userExist) return res.status(403).json({
            message: "No user exist"
        })

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

}

export const isModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const role = await Role.find({
            _id: {
                $in: user.roles
            }
        })
    
         for(let i = 0; i < role.length; i++){
             if(role[i].name === "moderator"){
                next()
                return;
             }
             return res.status(403).json({
                message: "Unauthorized, required moderator status"
            });
         }
    
        res.status(403).json({
            message: "Required moderator status"
        });
    
       } catch (error) {
         
            res.status(403).json({
                message: "Unauthorized",
                error
            });
       }
}

export const isAdmin = async (req, res, next) => {

   try {
    const user = await User.findById(req.userId);
    const role = await Role.find({
        _id: {
            $in: user.roles
        }
    })

     for(let i = 0; i < role.length; i++){
         if(role[i].name === "admin"){
            next()
            return;
         }
         return res.status(403).json({
            message: "Unauthorized, required admin status"
        });
     }

    res.status(403).json({
        message: "Required admin status"
    });

   } catch (error) {
     
        res.status(403).json({
            message: "Unauthorized",
            error
        });
   }
    
}