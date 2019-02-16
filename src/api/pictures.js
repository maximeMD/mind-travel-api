import resource from 'resource-router-middleware';
import pictures from '../models/pictures';
import aws from 'aws-sdk';
import * as awsConfig from '../awsconfig.json';

export default ({ config, db }) =>
  resource({
    /** Property name to store preloaded entity on `request`. */
    id: 'picture',

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
      res.json(pictures);
    },

    /** POST / - Create a new entity */
    // create({ body }, res) {
    //   body.id = facets.length.toString(36);
    //   facets.push(body);
    //   res.json(body);
    // },

    /** GET /:id - Return a given entity */
    read({ picture }, res) {
      const s3 = new aws.S3();
      aws.config.update({
        secretAccessKey: awsConfig.awsSecretKey,
        accessKeyId: awsConfig.awsAccessKey,
        region: awsConfig.awsS3Region
      });
      var s3Params = {
        Bucket: awsConfig.awsS3BucketName,
        Key: 'abstract-conifer-day-1028223blabla.jpg'
      };
      console.log(aws.config);
      s3.getObject(s3Params, function(err, data) {
        if (err) console.log(err, err.stack);
        console.log('HEREITIS');
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        console.log(data);
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
      });
    }

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
