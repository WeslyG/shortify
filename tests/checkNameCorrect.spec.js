import { checkNameCorrect } from '../src/controllers/link/createLink';
import mongoUnit from 'mongo-unit';
import testData from './data.json';

describe('[FUNC] checkNameCorrect', () => {
  beforeEach(() => mongoUnit.initDb(process.env.MONGOURL, testData));
  afterEach(() => mongoUnit.drop());

  it('String name check', async () => {
    const res = await checkNameCorrect('validstring');
    res.should.be.a('boolean');
    res.should.equal(true);
  });

  it('Number name check', async () => {
    const res = await checkNameCorrect(12352);
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  it('Number and name check', async () => {
    const res = await checkNameCorrect('main123');
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  it('Boolean name check', async () => {
    const res = await checkNameCorrect(false);
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  it('Null name check', async () => {
    const res = await checkNameCorrect(null);
    res.should.be.a('boolean');
    res.should.equal(false);
  });

  it('undefined name check', async () => {
    const res = await checkNameCorrect(undefined);
    res.should.be.a('boolean');
    res.should.equal(false);
  });

});
