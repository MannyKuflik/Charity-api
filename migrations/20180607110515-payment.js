'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('payment', {
    id: {
      type: 'int',
      primaryKey: true
    },
    full_name: {
      type: 'string',
      length: 40
    },
    number: {
      type: 'int'
    },
    securitycode: {
      type: 'int',
    },
    expmonth: {
      type: 'int',
    },
    expyear: {
      type: 'int',
    },
  }, callback);
  return null;

};

exports.down = function (db, callback) {
  db.dropTable('payment')
  return null;
};

exports._meta = {
  "version": 1
};

