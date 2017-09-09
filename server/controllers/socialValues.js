
import allModels from '../models';
import MiddleWare from '../middleware';

const middleware = new MiddleWare();
/**
 * Retrieves recipes in descending order by votes
 *
 * @param {object} req request object
 * @param {object} res response object
 * @returns {null} returns null
 */
const getValuesInDesc = (req, res) => {
  allModels.social_values.findAll({
    order: [
      ['upvotes', 'DESC'],
    ],
    include: [{
      model: allModels.recipes,
    },
    ]
  }).then(value => res.json({ status: 'success', data: value })).catch(error => middleware.parseSequelizeError(res, error));
};
const allMethods = { getValuesInDesc };
export default allMethods;
