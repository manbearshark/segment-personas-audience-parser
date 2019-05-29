const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');

const fileName = process.argv[2];  // Change this if you want more args

const parser = parse({
  delimiter: ',',
  columns: true
});

const transformer = transform(function(record, callback){
  let personasId = record.key;
  const externalIds = JSON.parse(record.external_ids);
  let userId = externalIds.user_id[0];
  let email = externalIds.email[0];
  callback(null, `${personasId}, ${userId}, ${email}\n`);
}, {
  parallel: 5
});

fs.createReadStream(fileName)
    .pipe(parser)
    .pipe(transformer)
    .pipe(process.stdout);