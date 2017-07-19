import {fourFourty} from '../src/math_helper'

import * as assert from 'assert';

describe('dummy test', () => {
    it('should take value out of module', () => {
        const result = fourFourty;
        assert.equal(result, 440);
    });
});
