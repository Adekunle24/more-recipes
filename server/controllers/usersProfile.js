import allModels from '../models';
const usersProfileModel = allModels.users_profile;
const getUserProfile = (req,res) =>{
    usersProfileModel.findOne({
        where : {
            userId : req.params.userId
        }
}).then(profile => res.json({status: 'success',data:profile}).catch(error => res.send(error.toString())));
};
export default {getUserProfile};