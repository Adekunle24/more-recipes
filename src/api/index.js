

const rootUrl = '127.0.0.1:8000/';
export const apiVersion = 'api/v1/';
export const addUser = `${apiVersion}users/signup`;
export const loginUser = `${apiVersion}users/signin`;
export const testApi = 'api/v1/test';
export const getRecipePostersApi = `${apiVersion}upload/posters`;
export const addRecipeApi = `${apiVersion}recipes`;
export const getRecipeApiForAnonymous = `${apiVersion}open-recipes`;
export const upvoteRecipeApi = recipeId => `${apiVersion}vote/${recipeId}/up`;
export const downvoteRecipeApi = recipeId => `${apiVersion}vote/${recipeId}/down`;
export default rootUrl;
