import Role from '../models/Role'
import User from '../models/User';

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({
                name: 'user'
            }).save(),
            new Role({
                name: 'admin'
            }).save(),
        ])

        

        const countUser = await User.estimatedDocumentCount();

        if (countUser > 0) return;


        const newUser = new User({
            email: 'admin@admin.com',
            password: await User.encryptPassword('admin123'),
        });
    
        if(roles){
            const findRoles = await Role.find({name: {$in: roles}});
            newUser.roles = findRoles.map(role => role._id);
        }else{
            const role = await Role.findOne({ name: 'user'});
            newUser.roles = [role._id];
        }
    
        await newUser.save();

    } catch (error) {
        console.error(error);
    }

}