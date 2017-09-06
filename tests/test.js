
import supertest from 'supertest';
import chai from 'chai';

const assert = chai.assert;

// This agent refers to PORT where program is runninng.

const server = supertest.agent('http://localhost:3000');
const testToken = 'eyJhbGciOiJIUzI1NiJ9.YQ.9vPL9lduW1jm_sA9xmkzWYCM0E8pFZ_LJnqnSc5RflE';
let authenticationToken;
// all API tests here

describe('API routes that manage users', () => {
  it('It should reject the request because token is absent ', (done) => {
    // calling home page api
    server
      .get('/api/users')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(403);
        assert.isFalse(res.body.tokenVerification);
        done();
      });
  });
  // test api that returns hello
  it('This api/test should return hello', (done) => {
    // calling test api
    server
      .get('/api/test')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.data.should.equal('hello');
        done();
      });
  });
  // DELETE api/users input validations with right data
  it('This api should delete the user successfully ', (done) => {
    server.delete('/api/users').set({ 'x-access-token': testToken }).send({ username: 'Adekunle' }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        done();
      });
  });

  // test api/users/signup input validations with right data
  it('This api should signup user and return validations : true ', (done) => {
    server.post('/api/users/signup').send({ username: 'Adekunle', email: 'sleekpetals.com@gmail.com', password: 'alpha24' }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.isTrue(res.body.success);
        done();
      });
  });

  // test api/users/signin with true data
  it('api/users/signin should sign in successfully', (done) => {
    server.post('/api/users/signin').send({ username: 'andela', password: 'password' }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.property(res.body, 'token');
        assert.isTrue(res.body.success);
        authenticationToken = res.body.token;
        done();
      });
  });

  // test api to retrieve all users
  it('This api/test should return array of users', (done) => {
    server
      .get('/api/users').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.isArray(res.body);
        assert.isAbove(res.body.length, 1);
        done();
      });
  });

  // test api/users/signup input validations without data
  it('api/users/signup should return validations : false without data', (done) => {
    server.post('/api/users/signup').set({ 'x-access-token': authenticationToken }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        done();
      });
  });

  // test api/users/signin input validations without data
  it('api/users/signin should return validations false ', (done) => {
    server.post('/api/users/signin').set({ 'x-access-token': authenticationToken }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        done();
      });
  });

  // test api/users/signin with true data and password is hidden from output
  it('api/users/signin should sign in and output should hide password', (done) => {
    server.post('/api/users/signin').set({ 'x-access-token': authenticationToken }).send({ username: 'andela', password: 'password' }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.isTrue(res.body.success);
        assert.isNull(res.body.data.password);
        done();
      });
  });
  // test api/users/signin with false data
  it('api/users/signin should not sign in with flase username or password', (done) => {
    server.post('/api/users/signin').send({ username: 'recipes', password: 'alpha24' }).expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.isFalse(res.body.success);
        done();
      });
  });

  // test api to retrieve all recipes
  it('GET/ api/recipes should return array of recipes', (done) => {
    server
      .get('/api/recipes').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        done();
      });
  });
});
describe('API routes that manage recipes', () => {
  it('POST/ api/recipes should return validations false without data', (done) => {
    server
      .post('/api/recipes').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.validations);
        done();
      });
  });
  let testRecipeId;
  it('POST/ api/recipes should return successful with data', (done) => {
    server
      .post('/api/recipes').set({ 'x-access-token': authenticationToken }).send({
        title: 'How to make pizza', user: 1, procedures: 'Pour oil in fry pan.. Mix it with water', ingredients: { item: 'melon', quantity: '1 cup' }
      })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.isTrue(res.body.success);
        testRecipeId = res.body.data.recipes.id;
        done();
      });
  });
  it('PUT api/recipes should return validations false without recipe ID', (done) => {
    server
      .put('/api/recipes').set({ 'x-access-token': authenticationToken }).send({
        title: 'How to make pizza without flour', user: 1, procedures: 'Pour oil in fry pan.. Mix it with water', ingredients: { item: 'melon', quantity: '1 cup' }
      })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.property(res.body, 'success');
        assert.property(res.body, 'message');
        assert.isFalse(res.body.success);
        done();
      });
  });
  it('PUT api/recipes should modify the recipe successfully', (done) => {
    server
      .put('/api/recipes').set({ 'x-access-token': authenticationToken }).send({ recipeId: testRecipeId, title: 'How to make pizza without flour and yeast' })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'data');
        assert.isTrue(res.body.success);
        assert.include(res.body.data.title, 'yeast');
        done();
      });
  });
  it('DELETE api/recipes should return validations false without recipe ID', (done) => {
    server
      .delete('/api/recipes').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.success);
        done();
      });
  });
  it('DELETE api/recipes should delete recipe successfully', (done) => {
    server
      .delete('/api/recipes').set({ 'x-access-token': authenticationToken }).send({ recipeId: testRecipeId })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.isTrue(res.body.success);
        done();
      });
  });
});

describe('API routes that manage reviews', () => {
  it('POST /api/recipes/:recipeId/reviews should post review successfully', (done) => {
    server
      .post('/api/recipes/5/reviews').set({ 'x-access-token': authenticationToken }).send({ review: 'I love your recipe and all my family enjoyed it' })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.isTrue(res.body.success);
        assert.property(res.body, 'status');
        done();
      });
  });
  it('POST /api/recipes/:recipeId/reviews should fail to post review', (done) => {
    server
      .post('/api/recipes/5/reviews').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'validations');
        assert.isFalse(res.body.success);
        assert.equal(res.body.status, 'fail');
        done();
      });
  });
  it('GET /api/recipes/:recipeId/reviews should get reviews successfully for a recipe', (done) => {
    server
      .get('/api/recipes/5/reviews').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.isArray(res.body.data);
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});

describe('API routes that manage favourite recipes', () => {
  it('DELETE /api/recipes/:recipeId/favourites should remove a recipe from favourites list for a user', (done) => {
    server
      .delete('/api/recipes/5/favourites').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.property(res.body, 'message');
        assert.equal(res.body.status, 'success');
        done();
      });
  });
  it('POST /api/recipes/:recipeId/favourites should add a recipe to favourites list for a user', (done) => {
    server
      .post('/api/recipes/5/favourites').set({ 'x-access-token': authenticationToken })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.status, 'success');
        done();
      });
  });
});
