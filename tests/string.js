import { expect, assert } from 'chai';
import {
  ucfirst,
  trim,
  ltrim,
  rtrim,
  replaceArray,
  ucwords,
  hasNumbers,
  convertToSlug,
  hasSpecialChars,
  isMinLength,
  isMaxLength,
  shorten
} from '../src/string';

describe('string.js', () => {
  describe('ucfirst()', () => {
    it('should turn first letter to upper case', () => {
      expect(ucfirst('john doe')).to.equal('John doe');
      expect(ucfirst('Jane Doe')).to.equal('Jane Doe');
      expect(ucfirst(('JOHN').toLowerCase())).to.equal('John');
      expect(ucfirst('John')).to.equal('John');
    });
  });

  describe('trim()', () => {
    it('should trim whitespace from beginning and end of string', () => {
      const test1 = trim('   devinencalada   ');
      const test2 = trim('      devinencalada       ');
      const test3 = trim('          devinencalada         ');
      const test4 = trim('              devinencalada           ');
      const expectedOutput = 'devinencalada';
      assert.equal(test1, expectedOutput);
      assert.equal(test2, expectedOutput);
      assert.equal(test3, expectedOutput);
      assert.equal(test4, expectedOutput);
    });
  });

  describe('ltrim()', () => {
    it('should trim whitespace from the beginning of the string', () => {
      const test1 = ltrim('   devinencalada     ');
      const test2 = ltrim('      devinencalada     ');
      const test3 = ltrim('          devinencalada     ');
      const test4 = ltrim('              devinencalada     ');
      const expectedOutput = 'devinencalada     ';
      assert.equal(test1, expectedOutput);
      assert.equal(test2, expectedOutput);
      assert.equal(test3, expectedOutput);
      assert.equal(test4, expectedOutput);
    });
  });

  describe('rtrim()', () => {
    it('should trim whitespace from the end of the string', () => {
      const test1 = rtrim('     devinencalada       ');
      const test2 = rtrim('     devinencalada              ');
      const test3 = rtrim('     devinencalada                     ');
      const test4 = rtrim('     devinencalada                           ');
      const expectedOutput = '     devinencalada';
      assert.equal(test1, expectedOutput);
      assert.equal(test2, expectedOutput);
      assert.equal(test3, expectedOutput);
      assert.equal(test4, expectedOutput);
    });
  });

  describe('replaceArray()', () => {
    it('Replace all occurrences of the values in the search array with the replacement values\n' +
      ' * from the replace array.', () => {
      const test1 = replaceArray('devinencalada', ['a', 'b', 'c'], ['z', 'z', 'z']);
      const test2 = replaceArray('devinencalada', ['encalada'], ['robinson']);
      const test3 = replaceArray('devinencalada', ['devin', 'encalada'], ['Hello', 'World']);
      assert.equal(test1, 'devinenzzlzdz');
      assert.equal(test2, 'devinrobinson');
      assert.equal(test3, 'HelloWorld');
    });
  });

  describe('ucwords()', () => {
    it('Uppercase the first character of each word in a string', () => {
      const test1 = ucwords('devin encalada');
      const test2 = ucwords('this is a test');
      const test3 = ucwords('testing 2 see if there are errors');
      const test4 = ucwords('21 & 35');
      assert.equal(test1, 'Devin Encalada');
      assert.equal(test2, 'This Is A Test');
      assert.equal(test3, 'Testing 2 See If There Are Errors');
      assert.equal(test4, '21 & 35');
    });
  });

  describe('hasNumbers()', () => {
    it('Checks to see if string has at least n amount of numbers', () => {
      const test1 = hasNumbers('devin encalada', 1);
      const test2 = hasNumbers('this is a test', 0);
      const test3 = hasNumbers('testing 2 see if there are errors', 1);
      const test4 = hasNumbers('21 & 35', 4);
      assert.equal(test1, false);
      assert.equal(test2, true);
      assert.equal(test3, true);
      assert.equal(test4, true);
    });
  });

  describe('convertToSlug()', () => {
    it('Converts the specifed value to a slug', () => {
      const test1 = convertToSlug('devin encalada');
      const test2 = convertToSlug('This Is A Test');
      const test3 = convertToSlug('Testing 2 see if there Are errors');
      const test4 = convertToSlug('Testing with number 2% and symbol');
      assert.equal(test1, 'devin-encalada');
      assert.equal(test2, 'this-is-a-test');
      assert.equal(test3, 'testing-2-see-if-there-are-errors');
      assert.equal(test4, 'testing-with-number-2-and-symbol');
    });
  });

  describe('hasSpecialChars()', () => {
    it('Checks to see if value has at least n amount of special characters.', () => {
      const test1 = hasSpecialChars('devin&encalada', 1);
      const test2 = hasSpecialChars('This Is A Test', 1);
      const test3 = hasSpecialChars('@@$%#', 5);
      const test4 = hasSpecialChars('!devinencalada2!', 2);
      assert.equal(test1, true);
      assert.equal(test2, false);
      assert.equal(test3, true);
      assert.equal(test4, true);
    });
  });

  describe('isMinLength()', () => {
    it('Checks the specified value\'s length is greater or equal than the specified length.', () => {
      const test1 = isMinLength('devin&encalada', 1);
      const test2 = isMinLength('This Is A Test', 10);
      const test3 = isMinLength('@@$%#', 10);
      const test4 = isMinLength('!devinencalada2!', 20);
      assert.equal(test1, true);
      assert.equal(test2, true);
      assert.equal(test3, false);
      assert.equal(test4, false);
    });
  });

  describe('isMaxLength()', () => {
    it('Checks the specified value\'s length is less or equal than the specified length.', () => {
      const test1 = isMaxLength('devin&encalada', 1);
      const test2 = isMaxLength('This Is A Test', 1);
      const test3 = isMaxLength('@@$%#', 50);
      const test4 = isMaxLength('!devinencalada2!', 20);
      assert.equal(test1, false);
      assert.equal(test2, false);
      assert.equal(test3, true);
      assert.equal(test4, true);
    });
  });

  describe('shorten()', () => {
    it('Checks the specified value\'s length is less or equal than the specified length.', () => {
      const test1 = shorten('devinencalada this is a test', 16);
      const test2 = shorten('This Is A Test', 10);
      const test3 = shorten('@@$%#', 55);
      const test4 = shorten('!devinencalada2!', 11);
      assert.equal(test1, 'devinencalada...');
      assert.equal(test2, 'This Is A...');
      assert.equal(test3, '@@$%#');
      assert.equal(test4, '...');
    });
  });
});
