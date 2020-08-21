'use strict';
module.exports = function(app) {
  var jsa = require('../controllers/jsaController');

  // JSA Routes
  app.route('/jsas')
    .get(jsa.list_all_records)
    .post(jsa.create_record);


  app.route('/jsas/:recordID')
    .get(jsa.read_record)
    .put(jsa.update_record)
    .delete(jsa.delete_record);
};