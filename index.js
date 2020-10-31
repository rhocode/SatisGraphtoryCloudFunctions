import {Storage} from '@google-cloud/storage';

// const storage = new Storage();

exports.storageTest = (req, res) => {

  // Possibly use some bucket, but should we save the generation?
  // storage
  //   .bucket("satisgraphtory-premium-storage")
  //   .file(name, {generation: 0})
  //   .save(data).then

  res.json({
    id: 0,
    data: "Hello world!"
  });

  res.send('Hello World!');
};