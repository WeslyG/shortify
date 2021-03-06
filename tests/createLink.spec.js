import chai from 'chai';
import app from '../app';
import chaiHttp from 'chai-http';
import mongoUnit from 'mongo-unit';
import testData from './data.json';
import { alreadyExistError } from '../src/dict/errorModel';

const should = chai.should();
chai.use(chaiHttp);

const data = {
  link: 'https://gist.github.com/',
  name: 'testName'
};

describe('[API] Link', () => {
  beforeEach(() => mongoUnit.initDb(process.env.MONGO_URL, testData));
  afterEach(() => mongoUnit.drop());

  it('Create link', done => {
    chai.request(app)
      .post('/links')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('originalLink').equal(data.link);
        res.body.should.have.property('hash');
        res.body.should.have.property('shortLink');
        done();
      });
  });

  it('Create named link', done => {
    chai.request(app)
      .post('/links')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link,
        name: data.name
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('originalLink').equal(data.link);
        res.body.should.have.property('hash').equal(data.name);
        res.body.should.have.property('shortLink');
        done();
      });
  });

  it('Create duplicate named link', done => {
    chai.request(app)
      .post('/links')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link,
        name: testData.linkmodels[0].hash
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(alreadyExistError.status);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal(alreadyExistError.message);
        done();
      });
  });

  it('Create system "stats" name', done => {
    chai.request(app)
      .post('/links')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link,
        name: 'stats'
      })
      .end((err, res) => {
        should.exist(res.body);
        res.should.have.status(alreadyExistError.status);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message').equal(alreadyExistError.message);
        done();
      });
  });

});
