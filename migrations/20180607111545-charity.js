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
  db.createTable('charity', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      length: 40
    },
    slogan: {
      type: 'string',
      length: 200
    },
    email: {
      type: 'string',
      length: 40
    },
    phonenumber: {
      type: 'string',
      length: 40
    }
  }, callback);
  return null;

};

exports.down = function (db, callback) {
  db.dropTable('charity')
  return null;
};

exports._meta = {
  "version": 1
};

