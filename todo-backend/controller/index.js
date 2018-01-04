const mongoose = require('mongoose');
const TODO = require('../model/ToDo');

module.exports = {
  ADDTODO: function(req, res, next) {
    const data = req.body;
    data.priority = data.priority || 0;
    let newData = {
      uid: data.uid,
      title: data.title,
      description: data.description,
      scheduleAt: new Date(parseInt(data.scheduleAt)).toISOString() || new Date(new Date().getTime() + 3600000).toISOString(),
      priority: parseInt(data.priority),
      createdAt: new Date().toISOString(),
      done: false
    }
    let newTODO = new TODO(newData);
    newTODO.save().then((r) => {
      res.json({success: true, id: newTODO._id.toString(), data: newTODO});
    }).catch(err => {
      res.json({success: false, error: err});
    })
  },
  EDITTODO: function(req, res, next) {
    const data = req.body;
    const editId = data.editId;
    if (!editId)
      res.json({success: false});
    data.priority = data.priority || 0;
    let newData = {
      title: data.title,
      description: data.description,
      scheduleAt: new Date(parseInt(data.scheduleAt)).toISOString() || new Date(new Date().getTime() + 3600000).toISOString(),
      priority: parseInt(data.priority),
    }
    TODO.update({
      _id: editId,
      uid: data.uid
    }, {$set: newData}).then(() => {
      TODO.findOne({_id: editId}).then((data) => {
        res.json({success: true, id: editId.toString(), data: data});
      })
    }).catch(err => {
      res.json({success: false, error: err});
    })
  },

  DONETODO: function(req, res, next) {
    const _id = req.params.id;
    if (!_id)
      res.json({success: false, error: 'Invalid Request'});
    TODO.findOne({_id}).then(_data => {
      if (_data._id)
        TODO.update({
          _id
        }, {
          $set: {
            done: true,
            completedAt: new Date().toISOString()
          }
        }).then(data => {
          res.json({success: true});
        })
      else
        res.json({success: false, error: 'No Record Found'});
      }
    ).catch(err => {
      res.json({success: false, error: err.reason});
    })
  },
  DELETETODO: function(req, res, next) {
    const data = req.body;
    const uid = data.uid;
    let ids = data.id;
    if(typeof data.id == 'string')
      ids = [ids];
    if (!uid)
      res.json({success: false, error: 'Invalid Request'});
    TODO.remove({
      $and: [
        {
          _id: {
            $in: ids
          }
        }, {
          uid
        }
      ]
    }).then(d => {
      res.json({success: true, id:ids});
    }).catch(err => {
      res.json({success: false, error: err.reason});
    })
  },

  LISTTODO: function(req, res, next) {
    const uid = req.params.uid;
    TODO.find({
      uid
    }, {
      title: 1,
      description: 1,
      createdAt: 1,
      done: 1,
      scheduleAt: 1,
      priority: 1,
      completedAt: 1
    }).sort({createdAt: -1}).then(data => {
      res.json({
        success: true,
        data: data || []
      });
    }).catch(err => {
      res.json({success: false, error: err});
    })

  }

}
