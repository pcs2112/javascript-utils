import { expect } from 'chai';
import { ucfirst } from '../src/string';

describe('string.js', () => {
  describe('#ucfirst', () => {
    it('should turn first letter to upper case', (done) => {
      expect(ucfirst('vince chavez')).to.equal('Vince chavez');
      done();
    });
  });
});
