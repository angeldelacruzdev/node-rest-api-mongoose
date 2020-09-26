import User from '../models/User';
import Role from '../models/Role'

import jwt from 'jsonwebtoken'

require('dotenv').config();


export const signUp = async (req, res) => {

    const {email, password, roles} = req.body;

    const newUser = new User({
        email,
        password: await User.encryptPassword(password),
    });

    if(roles){
        const findRoles = await Role.find({name: {$in: roles}});
        newUser.roles = findRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({ name: 'user'});
        newUser.roles = [role._id];
    }

    const saveUser = await newUser.save();

    const token = jwt.sign({id: saveUser._id}, process.env.SECRET_TOKEN, {
        expiresIn: process.env.EXPIRE_TOKEN
    })

    res.status(200).json({
        token
    });
    
}

//Login User
export const signIn = async (req, res) => {

    const user = await User.findOne({ email: req.body.email }).populate("roles");

    if(!user) return res.status(400).json({ message: "Usuario incorrecto."});

    const matchPassword = await User.comparePassword(req.body.password, user.password);

    if(!matchPassword) return res.status(400).json({ token: null, message: "Contraseña incorrecta."});


    const token = jwt.sign({ id: user._id}, process.env.SECRET_TOKEN, {
        expiresIn: 172800 //process.env.EXPIRE_TOKEN
    })   

    res.json({token, user:{
        email: user.email,
        roles: user.roles
    }})
}

