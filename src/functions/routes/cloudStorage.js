import {Router} from 'express';
import {Storage} from '@google-cloud/storage';
import uuid from 'uuidv4';
import JSONC from '../jsonc';

const router = Router();
const storage = new Storage();

router.get('/get/:id', async (req, res, next) => {

// // Downloads the file
  let failed = false;

  do {
    failed = false;
    try {
      await storage
        .bucket("satisgraphtory-premium-storage")
        .file(req.params.id)
        .download()
        .then(function(data){
          if (data)
            res.json({
              internal: JSONC.unpack( data.toString('utf8'), true ),
              data: "Hello world!"
            });
        })
    } catch (e) {
      failed = true;
    }
  } while (failed);

  //
  // console.log(
  //   `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
  // res.json({
  //   id: 0,
  //   data: "Hello world!"
  // });
});

router.get('/create', async (req, res, next) => {

  let failed = false;
  let failures = 0;
  let usedName = null;

  const data = JSONC.pack( {"hello": 1}, true );

  do {
    failed = false;

    try {
      const name = uuid();
      usedName = name;

      await storage
        .bucket("satisgraphtory-premium-storage")
        .file(name, {generation: 0})
        .save(data)
    } catch (e) {
      failed = true;
    }

  } while (failed && failures++ < 3);

  res.json({
    id: 0,
    data: "Hello world!",
    name: usedName
  });
});

const CloudStorage = router;

export default CloudStorage;