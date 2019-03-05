// import resource from 'resource-router-middleware';
import aws from 'aws-sdk';
import * as awsConfig from '../awsconfig.json';
import { Router } from 'express';

var albumsRouter = Router();

/* Get all albums */
albumsRouter.get('/', (req, res) => {
  var albums = [];
  var newAlbumKey = '';

  aws.config.update({
    secretAccessKey: awsConfig.awsSecretKey,
    accessKeyId: awsConfig.awsAccessKey,
    region: awsConfig.awsS3Region
  });

  var s3Params = {
    Bucket: awsConfig.awsS3BucketName
  };
  var s3 = new aws.S3();

  s3.listObjectsV2(s3Params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      data.Contents.forEach(item => {
        var albumKey = item.Key.split('/')[0];
        var pictureKey = item.Key.split('/')[1]; // null if the item is an album

        if (pictureKey) {
          // this item is a picture
          albums.map(album => {
            if (album.key == albumKey) {
              album.pictures.push(item.Key);
              if (pictureKey == '_thumb') {
                album.thumbnail = item.Key;
              }
            }
          });
        } else {
          // this item is an album
          newAlbumKey = item.Key.split('/')[0];
          albums.push({
            key: newAlbumKey,
            pictures: []
          });
        }
      });
    }
    res.json(albums);
  });
});
export default albumsRouter;
