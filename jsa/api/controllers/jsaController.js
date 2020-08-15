'use strict';

var mongoose = require('mongoose'),
  JSA = mongoose.model('JSA');

exports.list_all_records = function(req, res) {
  JSA.find({}, {activity:1, "steps.description":1}, function(err, records) {
    if (err)
      res.send(err);
    res.json(records);
  });
};


exports.create_record = function(req, res) {
    var new_record = new JSA(req.body);
    new_record.save(function(err, record) {
      if (err)
        res.send(err);
      res.json(record);
    });
  };
  
  
  exports.read_record = function(req, res) {
    JSA.findById(req.params.recordID, function(err, record) {
      if (err)
        res.send(err);
      res.json(record);
    });
  };
  
  
  exports.update_record = function(req, res) {
    JSA.findOneAndUpdate({_id: req.params.recordID}, req.body, {new: true}, function(err, record) {
      if (err)
        res.send(err);
      res.json(record);
    });
  };
  
  
  exports.delete_record = function(req, res) {
    JSA.remove({
      _id: req.params.recordID
    }, function(err, record) {
      if (err)
        res.send(err);
      res.json({ message: 'JSA record successfully deleted' });
    });
  };