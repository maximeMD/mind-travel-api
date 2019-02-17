// import resource from 'resource-router-middleware';
import aws from 'aws-sdk';
import * as awsConfig from '../awsconfig.json';
import { Router } from 'express';

var imagesRouter = Router();

aws.config.update({
  secretAccessKey: awsConfig.awsSecretKey,
  accessKeyId: awsConfig.awsAccessKey,
  region: awsConfig.awsS3Region
});
const s3 = new aws.S3();

/* Get an image */
imagesRouter.get('/:id', (req, res) => {
  console.log('Retrieve image with key : ' + req.params.id);
  const s3ParamsGetImage = {
    Bucket: awsConfig.awsS3BucketNameImages,
    Key: req.params.id
  };
  s3.getObject(s3ParamsGetImage, function(err, data) {
    if (err) console.log(err);
    else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data.Body, 'binary');
      res.end(null, 'binary');
    }
  });
});
/* Get an image thumbnail */
imagesRouter.get('/thumb/:id', (req, res) => {
  console.log('Retrieve image thumbnail with key : ' + req.params.id);
  const s3ParamsGetImageThumb = {
    Bucket: awsConfig.awsS3BucketNameImagesThumbnails,
    Key: req.params.id
  };
  s3.getObject(s3ParamsGetImageThumb, function(err, data) {
    if (err) console.log(err);
    else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data.Body, 'binary');
      res.end(null, 'binary');
    }
  });
});
export default imagesRouter;
