'use strict';

var AWS = require('aws-sdk');

module.exports.requestUploadURL = (event, _, callback) => {
  var s3 = new AWS.S3();
  var params = JSON.parse(event.body);

  var s3Params = {
    Bucket: 'file-upload-aws',
    Key: params.name,
    ContentType: params.type,
    ACL: 'public-read',
  };

  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  callback(null, {
    statusCode: 200,
    headers: {
      // 'Access-Control-Allow-Origin': 'https://frosty-morse-b7b3c9.netlify.com'
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
