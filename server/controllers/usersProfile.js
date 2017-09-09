import allModels from '../models';
import Middleware from '../middleware';

const middleware = new Middleware();
const usersProfileModel = allModels.users_profile;
const getUserProfile = (req, res) => {
  usersProfileModel.findOne({
    where: {
      userId: req.decoded.id
    }
  }).then(profile => res.json({ status: 'success', data: profile }).catch(error => middleware.parseSequelizeError(res, error)));
};
export default { getUserProfile };
