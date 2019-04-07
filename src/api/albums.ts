import aws from 'aws-sdk';
import { Router } from 'express';
import credentials from '../credentials.json';
import Album from '../models/album.model.js';

const albumsRouter = Router();

/**
 * GET /albums/
 * Get informations about all albums
 */
albumsRouter.get('/', (req, res) => {
  const albums: Album[] = [];

  const s3Params = {
    Bucket: credentials.awsS3BucketNameImages,
  };
  const s3 = new aws.S3();

  s3.listObjectsV2(s3Params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      if (data && data.Contents) {
        data.Contents.forEach((item: aws.S3.Object) => {
          if (item.Key && item.Key !== undefined) {
            const itemKey: string = item.Key;
            const albumKey = itemKey.split('/')[0];
            const pictureKey = itemKey.split('/')[1]; // null if the item is an album

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
                  album.pictures.push(itemKey);
                  if (pictureKey === '_thumb') {
                    album.thumbnail = itemKey;
                  }
                }
              });
            }
          } else {
            console.error('This object key is null or undefined : ' + item);
          }
        });
      }
    }
    res.json(albums);
  });
});
export default albumsRouter;
