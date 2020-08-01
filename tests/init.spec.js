import mongoUnit from 'mongo-unit';

mongoUnit.start({ dbName: 'shorter'})
  .then(() => {
    process.env.MONGO_URL = mongoUnit.getUrl().match(/(mongodb:\/\/)(.*)\//)[2];
    console.log(`Fake mongo is started: ${process.env.MONGO_URL}`);
    run();
    return null;
  })
  .catch(err => {
    throw err;
  });

after(() => {
  console.log('Stop database');0;
  return mongoUnit.stop();
});
