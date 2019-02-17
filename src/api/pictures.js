// import resource from 'resource-router-middleware';
import aws from 'aws-sdk';
import * as awsConfig from '../awsconfig.json';
import { Router } from 'express';

var imagesRouter = Router();

/* Get an image */
imagesRouter.get('/:id', (req, res) => {
  aws.config.update({
    secretAccessKey: awsConfig.awsSecretKey,
    accessKeyId: awsConfig.awsAccessKey,
    region: awsConfig.awsS3Region
  });
  var s3Params = {
    Bucket: awsConfig.awsS3BucketName,
    Key: req.params.id
  };
  var s3 = new aws.S3();

  s3.getObject(s3Params, function(err, data) {
    if (err) console.log(err);
    else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data.Body, 'binary');
      res.end(null, 'binary');
    }
  });
});
export default imagesRouter;
