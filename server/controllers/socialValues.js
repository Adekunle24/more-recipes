
import allModels from '../models';

const getValuesInDesc = (req, res) => {
  allModels.social_values.findAll({
    order: [
      ['upvotes', 'DESC'],
    ],
    include: [{
      model: allModels.recipes,
    },
    ]
  }).then(value => res.json({ status: 'success', data: value })).catch(error => res.send(error.toString()));
};
const allMethods = { getValuesInDesc };
export default allMethods;
