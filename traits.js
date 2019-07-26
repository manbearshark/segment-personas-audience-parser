const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');
const _ = require('lodash');

const fileName = process.argv[2];  // Change this if you want more args

var traitKeys = [];

const parser = parse({
  delimiter: ',',
  columns: true
});

const setTraitValues = function(traits) {
  let traitString = '';
  traitKeys.forEach((trait) => {
    //console.log("Trait: ", trait);
    if(traits[trait]) {
        traitString = traitString.concat(`,${traits[trait]}`);
        //console.log(traitString);
    } else {
        traitString = traitString.concat(`,null`);
    }
  });
  return traitString;
};

const transformColumns = transform(function(record, callback){
  const traits = JSON.parse(record.json_value);
  traitKeys = _.union(traitKeys, (_.keys(traits)));
  //console.log(traitKeys);
  callback(null, ``);
}, {
  parallel: 5
});

const transformAll = transform(function(record, callback) {
  let email = record.key;
  const traits = JSON.parse(record.json_value);
  const externalIDs = JSON.parse(record.external_ids);
  let anonymousId = externalIDs.anonymous_id[0];
  let traitValues = setTraitValues(traits);
  callback(null, `${email},${anonymousId}${traitValues}\n`);
}, {
    parallel: 5
});

// First, parse out all the columns in case there are different traits across user records
let stream = fs.createReadStream(fileName);

stream.on('close', () => {
  // Make sure the original file stream is closed, then re-parse

  //console.log("Trait Columns: ", traitKeys);

  const parser = parse({
    delimiter: ',',
    columns: true
  });

  fs.createReadStream(fileName)
    .pipe(parser)
    .pipe(transformAll)
    .pipe(process.stdout);
});

// Parse all the column values...
stream.pipe(parser)
  .pipe(transformColumns);
