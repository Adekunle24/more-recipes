import allModels from '../models';
import Middleware from '../middleware';

const middleware = new Middleware();
const usersProfileModel = allModels.users_profile;
/**
 * Retrieves user profile
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const getUserProfile = (req, res) => {
  usersProfileModel.findOne({
    where: {
      userId: req.decoded.id
    }
  }).then(profile => res.json({ status: 'success', data: profile }).catch(error => middleware.parseSequelizeError(res, error)));
};
export default { getUserProfile };
