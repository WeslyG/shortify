import chai from 'chai';
import app from '../app';
import chaiHttp from 'chai-http';
import mongoUnit from 'mongo-unit';
import testData from './data.json';
import { alreadyExistError } from '../src/models/errorModel';

const should = chai.should();
chai.use(chaiHttp);

const data = {
  link: 'https://gist.github.com/',
  name: 'testName',
  bannedName: 'stats'
};

describe('Link', () => {
  beforeEach(() => mongoUnit.initDb(process.env.MONGOURL, testData));
  afterEach(() => mongoUnit.drop());

  it('Create link', done => {
    chai.request(app)
      .post('/link')
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
        res.body.should.have.property('id');
        done();
      });
  });

  it('Create named link', done => {
    chai.request(app)
      .post('/link')
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
        res.body.should.have.property('id');
        done();
      });
  });

  it('Create duplicate named link', done => {
    chai.request(app)
      .post('/link')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link,
        name: 'Named'
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

  it('Create banned link', done => {
    chai.request(app)
      .post('/link')
      .set('Content-Type', 'application/json')
      .send({
        link: data.link,
        name: data.bannedName
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
