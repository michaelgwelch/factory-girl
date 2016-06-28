/**
 * Created by chetanv on 06/06/16.
 */

import '../test-helper/testUtils';
import Assoc from '../../src/generators/Assoc';
import { expect } from 'chai';
import DummyFactoryGirl from '../test-helper/DummyFactoryGirl';
import asyncFunction from '../test-helper/asyncFunction';
import sinon from 'sinon';
// import _debug from 'debug';

// const debug = _debug('AssocSpec');

describe('Assoc', function () {
  describe('#generate', function () {
    const factoryGirl = new DummyFactoryGirl;
    const name = 'someModel';
    const key = 'someKey';
    const dummyAttrs = {};
    const dummyBuildOptions = {};
    const assoc = new Assoc(
      factoryGirl, name, key, dummyAttrs, dummyBuildOptions
    );

    it('calls create on the factoryGirl object',
      asyncFunction(async function () {
        sinon.spy(factoryGirl, 'create');
        await assoc.generate();
        expect(factoryGirl.create).to.have.been.calledWith(
          name, dummyAttrs, dummyBuildOptions
        );
        factoryGirl.create.restore();
      })
    );

    it('returns a promise', function () {
      const modelP = assoc.generate();
      expect(modelP.then).to.be.a('function');
      return expect(modelP).to.be.eventually.fulfilled;
    });

    it('resolves to the object returned by factory if key is null',
      asyncFunction(async function () {
        const assocWithNullKey = new Assoc(factoryGirl, name);
        const model = await assocWithNullKey.generate();
        expect(model).to.be.an('object');
      })
    );

    it('resolves to the object property returned by factory if key is not null',
      asyncFunction(async function () {
        const assocWithKey = new Assoc(factoryGirl, name, 'name');
        const modelA = await assocWithKey.generate();
        expect(modelA).to.be.equal('Wayne');
      })
    );
  });
});