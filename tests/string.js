import { expect } from 'chai';
import { ucfirst } from '../src/string';

describe('string.js', () => {
  describe('#ucfirst', () => {
    it('should turn first letter to upper case', () => {
      expect(ucfirst('john doe')).to.equal('John doe');
      expect(ucfirst('Jane Doe')).to.equal('Jane Doe');
      expect(ucfirst(('JOHN').toLowerCase())).to.equal('John');
      expect(ucfirst('John')).to.equal('John');
    });
  });
});
