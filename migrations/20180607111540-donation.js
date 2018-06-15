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
  db.createTable('donation', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: 'int',
      length: 20
    },
    user_id: {
      type: 'int',
      length: 20,
    },
    charity_id: {
      type: 'int',
      length: 20,
    },
    charity_name: {
      type: 'string',
      length: 200,
    }
  }, callback);
  return null;

};

exports.down = function (db, callback) {
  db.dropTable('donation')
  return null;
};

exports._meta = {
  "version": 1
};

