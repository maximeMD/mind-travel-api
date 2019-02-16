import resource from 'resource-router-middleware';
import albums from '../models/albums';
import aws from 'aws-sdk';
import * as awsConfig from '../awsconfig.json';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'album',

    /** For requests with an `id`, you can auto-load the entity.
     *  Errors terminate the request, success sets `req[id] = data`.
     */
    // load(req, id, callback) {
    //   let facet = facets.find(facet => facet.id === id),
    //     err = facet ? null : 'Not found';
    //   callback(err, facet);
    // },

    /** GET / - List all entities */
    index({ params }, res) {
      var albums = [];

      aws.config.update({
        secretAccessKey: awsConfig.awsSecretKey,
        accessKeyId: awsConfig.awsAccessKey,
        region: awsConfig.awsS3Region
      });

      var s3Params = {
        Bucket: awsConfig.awsS3BucketName,
        Delimiter: '/'
      };
      var s3 = new aws.S3();

      s3.listObjectsV2(s3Params, function(err, data) {
        if (err) console.log(err, err.stack);
        else {
          data.Contents.forEach(item => {
            albums.push(item.Key);
          });
        }
        res.json(albums);
      });

      // res.json(albums);
    }

    /** POST / - Create a new entity */
    // create({ body }, res) {
    //   body.id = facets.length.toString(36);
    //   facets.push(body);
    //   res.json(body);
    // },

    /** GET /:id - Return a given entity */
    // read({ facet }, res) {
    //   res.json(facet);
    // },

    /** PUT /:id - Update a given entity */
    // update({ facet, body }, res) {
    //   for (let key in body) {
    //     if (key !== 'id') {
    //       facet[key] = body[key];
    //     }
    //   }
    //   res.sendStatus(204);
    // },

    /** DELETE /:id - Delete a given entity */
    // delete({ facet }, res) {
    //   facets.splice(facets.indexOf(facet), 1);
    //   res.sendStatus(204);
    // }
  });
