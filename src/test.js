/* global describe, it */

import should from 'should';
import assoc from './index';

describe("assoclist.js", () => {
  it("#constructor", () => assoc.empty().should.not.be.empty());

  it("#isEmpty", () => assoc.empty().isEmpty().should.be.ok());

  describe ("inserting and getting elements", () => {
    describe ("#keys", () => {
      it("#keys", () => assoc.empty().keys().should.be.eql([]));
    });

    describe ("#values", () => {
      it("#values", () => assoc.empty().values().should.be.eql([]));
    });

    describe ("#set", () => {
      it("new key value", () => assoc.empty().set(1, 1).should.be.eql(assoc([[1, 1]])));
      it("update a key", () => assoc([[1, 1]]).set(1, 2).should.be.eql(assoc([[1, 2]])));
    });

    describe ("#get", () => {
      it("key don't exist", () => should(assoc.empty().get(1)).be.eql(null));
      it("get by key", () => assoc.empty().set(1, 1).get(1).should.be.eql(1));
    });
  });

  describe ("operations", () => {
    it("#mapWithKey", () => {
      assoc([[1, 1], [2, 2]]).mapWithKey(
        (k, v) => k + 1
      ).should.be.eql(
        assoc([[1, 2], [2, 3]])
      );
    });

    it("#concat", () => {
      assoc([[1, 1]]).concat(assoc([[2, 2]])).should.be.eql(
        assoc([[1, 1], [2, 2]])
      );
    });

    it("#foldable", () => {
      assoc([[1, 1], [2, 2]]).reduce(
        (acc, x) => acc.concat(x[0]),
        []
      ).should.be.eql([1, 2]);
    });

    it("#partition", () => {
      assoc([[1, 1], [2, 2]]).partition(
        x => x == 1
      ).should.be.eql([
        assoc([[1, 1]]),
        assoc([[2, 2]])
      ]);
    });

    it("#partitionWithKey", () => {
      assoc([[1, 1], [2, 2]]).partition(
        (k, v) => k == 1
      ).should.be.eql([
        assoc([[1, 1]]),
        assoc([[2, 2]])
      ]);
    });

    it("#filter", () => {
      assoc([[1, 1], [2, 2]]).filter(
        x => x > 1
      ).should.be.eql(assoc([[2, 2]]));
    });

    it("#filterWithKey", () => {
      assoc([[1, 1], [2, 2]]).filter(
        (k, v) => k <= 1
      ).should.be.eql(assoc([[1, 1]]));
    });

    it("#find", () => {
      assoc([[1, 1], [2, 2]]).find(
        item => item[0] > 1
      ).should.be.eql(2);
    });

    it("#update", () => {
      assoc([['a', 1], ['b', 2]]).update(
        'a',
        v => v + 1
      ).should.be.eql(assoc([['a', 2], ['b', 2]]));
    });

    it("#updateWithKey", () => {
      assoc([[1, 1], [2, 2]]).updateWithKey(
        2,
        (k, v) => (v + 1) * k
      ).should.be.eql(assoc([[1, 1], [2, 6]]));
    });

    it("#sort", () => {
      assoc([[1, 3], [3, 2], [2, 1]]).sort(
        (a, b) => a - b
      ).values().should.be.eql([1, 2, 3]);
    });
  });
});
