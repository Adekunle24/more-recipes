import chai from 'chai';
const assert = chai.assert;
import Middlewares from '../server/middleware';
describe('Test for all middlewares',()=>{
describe('MiddlesWares must be defined',()=>{
    it('Class MiddleWares must be defined',()=>{
        assert.isDefined(Middlewares);
    });
});
describe('All MiddlesWares method must be defined ',()=>{
    const ware = new Middlewares();
    it('JsonWebToken verification method must be defined',()=>{
        assert.isDefined(ware.verifyJsonWebToken);
    });
      it('Bcrypt encryption method must be defined',()=>{
        const ware = new Middlewares();
        assert.isDefined(ware.encrypt);
    });
})
});