import supertest from 'supertest';
import  should from 'should';
import chai from 'chai';
const assert = chai.assert;

// This agent refers to PORT where program is runninng.

let server = supertest.agent('http://localhost:3000');
const testToken = 'eyJhbGciOiJIUzI1NiJ9.YQ.9vPL9lduW1jm_sA9xmkzWYCM0E8pFZ_LJnqnSc5RflE';
  let authenticationToken;
// all API tests here

describe('API routes that manage users',() =>{
  it('It should reject the request because token is absent ',(done) =>{
    // calling home page api
    server
      .get('/api/users')
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        res.status.should.equal(403);
        assert.isFalse(res.body.tokenVerification);
        done();
      });
  });
  // test api that returns hello
  it('This api/test should return hello',(done) =>{
    // calling test api
    server
      .get('/api/test')
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        res.body.data.should.equal('hello');
        done();
      });
  });
  // DELETE api/users input validations with right data
  it('This api should delete the user successfully ',(done) =>{
    server.delete('/api/users').set({'x-access-token': testToken}).send({username:'Adekunle'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        done();
      });
  });

  // test api/users/signup input validations with right data
  it('This api should signup user and return validations : true ',(done) =>{
    server.post('/api/users/signup').send({username:'Adekunle',email:'sleekpetals.com@gmail.com',password:'alpha24'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isTrue(res.body.success);
        done();
      });
  });
  
  // test api/users/signin with true data
  it('api/users/signin should sign in successfully',(done) =>{
    server.post('/api/users/signin').send({username:'andela',password:'password'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.property(res.body, 'token');
        assert.isTrue(res.body.success);
        authenticationToken = res.body.token;
        done();
      });
  });

  // test api to retrieve all users
  it('This api/test should return array of users',(done) =>{
    server
      .get('/api/users').set({'x-access-token': authenticationToken})
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        assert.isArray(res.body);
        assert.isAbove(res.body.length,1);
        done();
      });
  });

  // test api/users/signup input validations without data
  it('api/users/signup should return validations : false without data',(done) =>{
    server.post('/api/users/signup').set({'x-access-token': authenticationToken}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        done();
      });
  });
 
  // test api/users/signin input validations without data
  it('api/users/signin should return validations false ',(done) =>{
    server.post('/api/users/signin').set({'x-access-token': authenticationToken}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        done();
      });
  });
 
  // test api/users/signin with true data and password is hidden from output
  it('api/users/signin should sign in and output should hide password',(done) =>{
    server.post('/api/users/signin').set({'x-access-token': authenticationToken}).send({username:'andela',password:'password'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isTrue(res.body.success);
        assert.isNull(res.body.data.password);
        done();
      });
  });
  // test api/users/signin with false data
  it('api/users/signin should not sign in with flase username or password',(done) =>{
    server.post('/api/users/signin').send({username:'recipes',password:'alpha24'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isFalse(res.body.success);
        done();
      });
  });

  // test api to retrieve all recipes
  it('GET/ api/recipes should return array of recipes',(done) =>{
    server
      .get('/api/recipes').set({'x-access-token': authenticationToken})
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        assert.isArray(res.body.data);
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        done();
      });
  });
});
describe('API routes that manage recipes',() =>{
  it('POST/ api/recipes should return validations false without data',(done) =>{
    server
      .post('/api/recipes').set({'x-access-token': authenticationToken})
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.property(res.body,'validations');
        assert.isFalse(res.body.validations);
        done();
      });
  });
  it('POST/ api/recipes should return successful with data',(done) =>{
    server
      .post('/api/recipes').set({'x-access-token': authenticationToken}).send({title:'How to make pizza',user:1,procedures:'Pour oil in fry pan.. Mix it with water',ingredients:{'item':'melon','quantity':'1 cup'}})
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isTrue(res.body.success);
        done();
      });
  });
});