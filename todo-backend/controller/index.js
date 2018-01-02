const mongoose = require('mongoose');
const TODO = require('../model/ToDo');

module.exports = {
  ADDTODO: function(req,res,next) {
      const data = req.body;
      let newData = {
        uid: data.uid,
        title: data.title,
        description: data.description,
        createdAt: new Date(),
        done: false
      }
      let newTODO = new TODO(newData);
      newTODO.save().then(()=>{
        res.json({success: true, id: newTODO._id.toString(), data: newTODO });
      }).catch(err=>{
        res.json({success: false, error: err});
      })
  },

  DONETODO: function (req,res,next) {
    const _id = req.params.id;
    if(!_id)
      res.json({success: false, error: 'Invalid Request'});
    TODO.findOne({_id}).then(_data=>{
      if(_data._id)
        TODO.update({_id},{$set:{
          done: true
        }}).then(data=>{
          res.json({success: true});
        })
      else
        res.json({success: false, error: 'No Record Found'});
    }).catch(err=>{
      res.json({success: false, error: err.reason});
    })
  },

  LISTTODO: function(req,res,next) {
    const uid = req.params.uid;
    TODO.find({uid},{title: 1, description: 1, createdAt: 1, done: 1}).sort({createdAt: -1}).then(data=>{
      res.json({success: true, data: data || []});
    }).catch(err=>{
      res.json({success: false, error: err.reason});
    })

  }

}
