import aws from 'aws-sdk';
import { Router } from 'express';
import credentials from '../credentials.json';
import Album from '../models/album.model.js';

const albumsRouter = Router();

/* Get all albums */
albumsRouter.get('/', (req, res) => {
  res.send('test');
  const albums: Album[] = [];

  aws.config.update({
    accessKeyId: credentials.awsAccessKey,
    region: credentials.awsS3Region,
    secretAccessKey: credentials.awsSecretKey,
  });

  const s3Params = {
    Bucket: credentials.awsS3BucketNameImages,
  };
  const s3 = new aws.S3();

  s3.listObjectsV2(s3Params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      if (data && data.Contents) {
        // TODO : use correct type for 'item'
        data.Contents.forEach((item: any) => {
          const albumKey = item.Key.split('/')[0];
          const pictureKey = item.Key.split('/')[1]; // null if the item is an album

          if (
            albums.findIndex((album: Album) => album.key === albumKey) === -1
          ) {
            // this is a new album, or a picture in a new album
            albums.push({
              key: albumKey,
              pictures: [],
              thumbnail: '',
            });
          }
          if (pictureKey) {
            // this item is a picture
            albums.map((album: Album) => {
              if (album.key === albumKey) {
                album.pictures.push(item.Key);
                if (pictureKey === '_thumb') {
                  album.thumbnail = item.Key;
                }
              }
            });
          }
        });
      }
    }
    res.json(albums);
  });
});
export default albumsRouter;
