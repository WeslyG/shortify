import { checkNameFree } from '../src/controllers/link/createLink';
import mongoUnit from 'mongo-unit';
import testData from './data.json';

describe('[FUNC] checkNameFree', () => {
  beforeEach(() => mongoUnit.initDb(process.env.MONGOURL, testData));
  afterEach(() => mongoUnit.drop());

  it('Stats try', async () => {
    const res = await checkNameFree('stats');
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  it('String name check', async () => {
    const res = await checkNameFree('validstring');
    res.should.be.a('boolean');
    res.should.equal(true);
  });

  it.skip('Number name check', async () => {
    const res = await checkNameFree(12352);
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  // it('Boolean name check', async () => {
  //   const res = await checkNameFree(true);
  //   res.should.be.a('boolean');
  //   res.should.equal(false);
  // });

  // it('Null name check', async () => {
  //   const res = await checkNameFree(null);
  //   res.should.be.a('boolean');
  //   res.should.equal(false);
  // });

  // it('Exist name check', async () => {
  //   const res = await checkNameFree(testData.linkmodels[0].hash);
  //   res.should.be.a('boolean');
  //   res.should.equal(false);
  // });

});
