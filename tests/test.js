// test for application start file
import app from '../app.js';
import chai from 'chai';
import routes from '../server/routes';
const assert = chai.assert;

describe('Application start file', () => {
  describe('Application Port',() => {
    it('Application must run on port 3000',()=>{
      assert.equal(app.get('port'),3000);
    });
  });
});