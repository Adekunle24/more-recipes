
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { assert } = chai;
chai.use(chaiHttp);

// This agent refers to PORT where program is runninng.

// const server = supertest(app);
const server = chai.request(app);
const testToken = 'eyJhbGciOiJIUzI1NiJ9.YQ.9vPL9lduW1jm_sA9xmkzWYCM0E8pFZ_LJnqnSc5RflE';
const ingredientString = JSON.stringify({
  data:
[{ item: 'melon', quantity: '1 cup' }, { item: 'oil', quantity: '2 litres' }]
});
let authenticationToken;
const testRecipeId = 4;
// all API tests here

describe('API routes that manage users', () => {
  // test api that returns hello
  it('This api/test should return hello', (done) => {
    // calling test api
    server
      .get('/api/v1/test')
      .end((err, res) => {
        assert.equal(res.body.data, 'hello');
        done();
      });
  });

  // DELETE api/users input validations with right data
  it('This api should delete the user successfully ', (done) => {
    server.delete('/api/v1/users').set({ 'x-access-token': testToken }).send({ username: 'TestUser' })
      .end((err, res) => {
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        done();
      });
  });

  // test api/users/signup input validations with right data
  it('This api should signup user and return validations : true ', (done) => {
    server.post('/api/v1/users/signup').send({
      username: 'TestUser',
      email: 'testuser.com@gmail.com',
      password: 'alphaomega'
    })

      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'success');
        done();
      });
  });

  // test api/users/signin with true data
  it('api/users/signin should sign in successfully', (done) => {
    server.post('/api/v1/users/signin').send({ username: 'Adekunle', password: 'alpha' })
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.property(res.body, 'message');
        assert.property(res.body, 'token');
        assert.equal(res.body.status, 'success');
        authenticationToken = res.body.token;
        done();
      });
  });

  // test api to retrieve all users
  it('This api/test should return array of users', (done) => {
    server
      .get('/api/v1/users').set({ 'x-access-token': authenticationToken })
      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.isAbove(res.body.data.length, 1);
        done();
      });
  });

  // test api/users/signup input validations without data
  it('api/users/signup should return validations : false without data', (done) => {
    server.post('/api/v1/users/signup').set({ 'x-access-token': authenticationToken })

      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.property(res.body, 'message');
        done();
      });
  });

  // test api/users/signin input validations without data
  it('api/users/signin should return validations false ', (done) => {
    server.post('/api/v1/users/signin').set({ 'x-access-token': authenticationToken })

      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.property(res.body, 'message');
        done();
      });
  });
  // test api/users/signin with false data
  it('api/users/signin should not sign in with false username or password', (done) => {
    server.post('/api/v1/users/signin').send({ username: 'recipes', password: 'alpha24' })

      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'fail');
        done();
      });
  });

  // test api to retrieve all recipes
  it('GET/ api/recipes should return array of recipes', (done) => {
    server
      .get('/api/v1/recipes').set({ 'x-access-token': authenticationToken })


      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.property(res.body, 'data');
        assert.property(res.body, 'status');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});
describe('API routes that manage recipes', () => {
  it('POST/ api/recipes should return validations false without data', (done) => {
    server
      .post('/api/v1/recipes').set({ 'x-access-token': authenticationToken })


      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'message');
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        done();
      });
  });
  // hide for travis
  it('POST/ api/recipes should return successful with data', (done) => {
    const recipeObject = {
      title: 'How to make pizza',
      procedures: 'Pour oil in fry pan.. Mix it with water',
      ingredients: ingredientString
    };
    server
      .post('/api/v1/recipes').set({ 'x-access-token': authenticationToken }).send(recipeObject)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  // hide for travis
  it('PUT api/recipes should return validations false without recipe ID', (done) => {
    server
      .put('/api/v1/recipes').set({ 'x-access-token': authenticationToken }).send({
        title: 'How to make pizza without flour',
        user: 1,
        procedures: 'Pour oil in fry pan.. Mix it with water',
        ingredients: ingredientString
      })


      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'fail');
        done();
      });
  });
  it('PUT api/recipes should modify the recipe successfully', (done) => {
    server
      .put('/api/v1/recipes').set({ 'x-access-token': authenticationToken })
      .send({ recipeId: 1, title: 'How to make pizza without flour and yeast', ingredients: ingredientString })
      .end((err, res) => {
        assert.equal(res.body.status, 'fail');
        done();
      });
  });
  it('DELETE api/recipes should return validations false without recipe ID', (done) => {
    server
      .delete('/api/v1/recipes').set({ 'x-access-token': authenticationToken })


      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.property(res.body, 'validations');
        done();
      });
  });
});

describe('API routes that manage reviews', () => {
  // hide for Travis
  it('POST /api/v1/recipes/:recipeId/reviews should post review successfully', (done) => {
    server
      .post('/api/v1/recipes/1/reviews')
      .set({ 'x-access-token': authenticationToken })
      .send({ review: 'I love your recipe and all my family enjoyed it' })
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.property(res.body, 'status');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  // hide for Travis
  it('POST /api/v1/recipes/:recipeId/reviews should fail to post review', (done) => {
    server
      .post(`/api/v1/recipes/${testRecipeId}/reviews`).set({ 'x-access-token': authenticationToken })
      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.equal(res.body.status, 'fail');
        done();
      });
  });


  it(
    'GET /api/v1/recipes/:recipeId/reviews should get reviews successfully for a recipe',
    (done) => {
      server
        .get(`/api/v1/recipes/${testRecipeId}/reviews`).set({ 'x-access-token': authenticationToken })
        .end((err, res) => {
          assert.isArray(res.body.data);
          assert.equal(res.body.status, 'success');
          done();
        });
    }
  );
  // hide for travis
  it(
    'POST /api/v1/recipes/:recipeId/favourites should add a recipe to favourites list for a user',
    (done) => {
      server
        .post(`/api/v1/recipes/${testRecipeId}/favourites`)
        .set({ 'x-access-token': authenticationToken })
        .end((err, res) => {
          assert.equal(res.body.status, 'success');
          assert.property(res.body, 'data');
          done();
        });
    }
  );
  // hide for travis
  it('DELETE api/recipes should delete recipe successfully', (done) => {
    server
      .delete('/api/v1/recipes').set({ 'x-access-token': authenticationToken }).send({ recipeId: 3 })
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});

describe('API routes that manage favourite recipes', () => {
  // hide for Travis
  const recipeIdForFavourites = 3;
  it('POST/ api/recipes should add recipe success to favourites list', (done) => {
    server
      .post(`/api/v1/recipes/${recipeIdForFavourites}/favourites`)
      .set({ 'x-access-token': authenticationToken })
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it(
    'DELETE /api/v1/recipes/:recipeId/favourites should remove a recipe from favourites list for a user',
    (done) => {
      server
        .delete(`/api/v1/recipes/${recipeIdForFavourites}/favourites`)
        .set({ 'x-access-token': authenticationToken })
        .end((err, res) => {
          assert.property(res.body, 'message');
          assert.equal(res.body.status, 'success');
          done();
        });
    }
  );
  // hide for Travis
});
