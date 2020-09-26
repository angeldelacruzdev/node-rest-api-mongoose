import Role from "../models/Role";
import User from "../models/User"
 
export const createUser = async(req, res) =>{

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

     
    res.status(200).json({
        message: "Registrado con exito."
    });
    
} 

export const getUsers = async(req, res) =>{


    const users = await User.find().populate('roles');

    res.status(200).json({
        users
    });

} 