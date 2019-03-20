// import resource from 'resource-router-middleware';
import aws from 'aws-sdk';
import * as credentials from '../credentials.json';
import { Router } from 'express';

var albumsRouter = Router();

/* Get all albums */
albumsRouter.get('/', (req, res) => {
  var albums = [];
  var newAlbumKey = '';

  aws.config.update({
    secretAccessKey: credentials.awsSecretKey,
    accessKeyId: credentials.awsAccessKey,
    region: credentials.awsS3Region,
  });

  var s3Params = {
    Bucket: credentials.awsS3BucketNameImages,
  };
  var s3 = new aws.S3();

  s3.listObjectsV2(s3Params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      data.Contents.forEach(item => {
        if (item.Key.includes('test')) console.log('TCL: item', item);

        var albumKey = item.Key.split('/')[0];
        var pictureKey = item.Key.split('/')[1]; // null if the item is an album

        if (albums.findIndex(album => album.key === albumKey) === -1) {
          // this is a new album, or a picture in a new album
          albums.push({
            key: albumKey,
            pictures: [],
          });
        }
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
        }
      });
    }
    res.json(albums);
  });
});
export default albumsRouter;
