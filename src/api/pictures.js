import aws from 'aws-sdk';
import * as credentials from '../credentials.json';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

var imagesRouter = Router();

aws.config.update({
  secretAccessKey: credentials.awsSecretKey,
  accessKeyId: credentials.awsAccessKey,
  region: credentials.awsS3Region,
});
const s3 = new aws.S3();

/* Get an image */
imagesRouter.get('/:id/:token', (req, res) => {
  if (req.params.token && jwt.verify(req.params.token, credentials.jwtSecret)) {
    console.log('Retrieve image with key : ' + req.params.id);
    const s3ParamsGetImage = {
      Bucket: credentials.awsS3BucketNameImages,
      Key: req.params.id,
    };
    s3.getObject(s3ParamsGetImage, function(err, data) {
      if (err) console.log(err);
      else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
      }
    });
  } else {
    res.sendStatus(401);
  }
});
/* Get an image thumbnail */
imagesRouter.get('/thumb/:id/:token', (req, res) => {
  if (req.params.token && jwt.verify(req.params.token, credentials.jwtSecret)) {
    console.log('Retrieve image thumbnail with key : ' + req.params.id);
    const s3ParamsGetImageThumb = {
      Bucket: credentials.awsS3BucketNameImagesThumbnails,
      Key: req.params.id,
    };
    s3.getObject(s3ParamsGetImageThumb, function(err, data) {
      if (err) console.log(err);
      else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
      }
    });
  } else {
    res.sendStatus(401);
  }
});
export default imagesRouter;
