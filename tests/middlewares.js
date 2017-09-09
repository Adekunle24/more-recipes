import chai from 'chai';
import Middlewares from '../server/middleware';

const assert = chai.assert;

describe('Test for all middlewares', () => {
  describe('MiddlesWares must be defined', () => {
    it('Class MiddleWares must be defined', () => {
      assert.isDefined(Middlewares);
    });
  });
  describe('All MiddlesWares method must be defined ', () => {
    const ware = new Middlewares();
    it('ParseSequelizeError method must be defined', () => {
      assert.isDefined(ware.parseSequelizeError);
    });
    it('ValidateUsername method should return false for invalid username', () => {
      const req = { body: { username: '2dvd`' } };
      assert.isFalse(ware.validateUsername(req));
    });
    it('ValidateUsername method should return true for valid username', () => {
      const req = { body: { username: 'Adekunle' } };
      assert.isObject(ware.validateUsername(req));
    });
    it('ValidatePassword method should return false for password less than 6 characters in length', () => {
      const req = { body: { username: '2dvd`', password: 'abc' } };
      assert.isFalse(ware.validatePasswordLength(req));
    });
    it('ValidatePassword method should return true for password greater than 6 characters in length', () => {
      const req = { body: { username: '2dvd`', password: 'abcdefg' } };
      assert.isObject(ware.validatePasswordLength(req));
    });
    it('ValidatePassword method should return false for password less than 6 characters in length', () => {
      const req = { body: { username: '2dvd`', password: 'abc' } };
      assert.isFalse(ware.validatePasswordLength(req));
    });
    it('ValidateRecipeTitle method should return false for recipe title that contains disallowed characters', () => {
      const title = '%how`';
      assert.isFalse(ware.validateRecipeTitle(title));
    });
    it('ValidateRecipeTitle method should return true for recipe title with only allowed characters', () => {
      const title = 'how to cook beans';
      assert.isObject(ware.validateRecipeTitle(title));
    });
    it('StringIsNumber method should return false for string that contain character(s) other than numbers', () => {
      const data = '65hh8';
      assert.isFalse(ware.validateStringIsNumber(data));
    });
    it('StringIsNumber method should return true for string that contains only numbers', () => {
      const data = '65238';
      assert.isTrue(ware.validateStringIsNumber(data));
    });
  });
});
