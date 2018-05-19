
import { isNull } from 'util';
import showSwalNotification from './swal';

const isStringEmpty = string => string.length > 0;
export const validateAddRecipe = (ingredientTitle, ingredients, selectedPoster, procedures) => {
  const recipeTitle = ingredientTitle;
  const recipeIngredients = ingredients;
  const poster = selectedPoster;
  let response = false;
  if (recipeTitle.length > 3) {
    if (recipeIngredients.length > 0) {
      if (!isNull(poster)) {
        if (procedures.length > 0) {
          response = true;
        } else {
          showSwalNotification('warning', 'Add Recipe', 'Please provide procedures');
        }
      } else {
        showSwalNotification('warning', 'Add Recipe', 'Please select a poster');
      }
    } else {
      showSwalNotification('info', 'Add Recipe', 'Please provide atleast an ingredient');
    }
  } else {
    showSwalNotification('info', 'Add Recipe', 'Recipe Title must be greater than five characters in length');
  }
  return response;
};
export default isStringEmpty;
