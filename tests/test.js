import supertest from 'supertest';
import  should from 'should';
import chai from 'chai';
const assert = chai.assert;

// This agent refers to PORT where program is runninng.

let server = supertest.agent('http://localhost:3000');

// all API tests here

describe('API : generate token',() =>{
  it('It should generate a token in a test environment',(done) =>{

    // calling home page api
    server
      .get('/api/token')
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });
  // test api that returns hello
  it('This api/test should return hello',(done) =>{

    // calling home page api
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

  // test api to retrieve all users
  it('This api/test should return array of users',(done) =>{
    server
      .get('/api/users')
      .expect('Content-type',/json/)
      .expect(200) // THis is HTTP response
      .end((err,res) =>{
      // HTTP status should be 200
        assert.isArray(res.body);
        assert.isAbove(res.body.length,2);
        done();
      });
  });

  // test api/users/signup input validations without data
  it('api/users/signup should return validations : false without data',(done) =>{
    server.post('/api/users/signup').expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        done();
      });
  });
  // test api/users/signup input validations with right data

  // it('This api should return validation : false ',(done) =>{
  //   server.post('/api/users/signup').send({username:'Adekunle',email:'sleekpetals.com@gmail.com',password:'alpha24'}).expect('Content-type',/json/)
  //     .expect(200).end((err,res) =>{
  //       assert.property(res.body,'data');
  //       assert.property(res.body,'success');
  //       assert.property(res.body,'message');
  //       assert.isTrue(res.body.success);
  //       done();
  //     });
  // });

  // test api/users/signin input validations without data
  it('api/users/signin should return validations false ',(done) =>{
    server.post('/api/users/signin').expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'validations');
        assert.isFalse(res.body.validations);
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        done();
      });
  });
  // test api/users/signin with true data
  it('api/users/signin should sign in successfully',(done) =>{
    server.post('/api/users/signin').send({username:'Adekunle',password:'alpha24'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isTrue(res.body.success);
        done();
      });
  });
  // test api/users/signin with true data and password is hidden from output
  it('api/users/signin should sign in and output should hide password',(done) =>{
    server.post('/api/users/signin').send({username:'Adekunle',password:'alpha24'}).expect('Content-type',/json/)
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
  it('api/users/signin should sign in',(done) =>{
    server.post('/api/users/signin').send({username:'recipes',password:'alpha24'}).expect('Content-type',/json/)
      .expect(200).end((err,res) =>{
        assert.property(res.body,'data');
        assert.property(res.body,'success');
        assert.property(res.body,'message');
        assert.isFalse(res.body.success);
        done();
      });
  });
});