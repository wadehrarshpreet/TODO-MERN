const { expect } = require('chai');
const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const CONFIG = require('../config');
const PORT = CONFIG.PORT;
const MONGO_URL = CONFIG.MONGO_URL;
const app = require('../App');
const TODO = mongoose.model('todolist');
mongoose.Promise = global.Promise;

before(function (done) {
  this.timeout(5000);
  mongoose.connect(MONGO_URL)
  .then(()=>{
    done();
  })
  .catch((err)=>{
    console.log(err);
  })
})

describe('add Todo List', function(){
  this.timeout(10000);
  before(function(done) {
    TODO.remove({uid: '1'}).then(res=>{
      TODO.count({uid: '1'}).then(count => {
        expect(count).to.equal(0);
        done();
      })
    }).catch(err=>{
      console.log(err);
      done();
    })
  });
  it('add to list', (done)=>{
    request(app)
    .post('/api/add')
    .send({
        uid: '1',
        title: 'Hello',
        description: 'world'
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json|text/)
    .expect(200)
    .end(function(err, res) {
      assert(res.body.success == true);
      const _id = res.body.id;
      return TODO.findOne({_id}).then((res)=>{
        expect(res.uid).to.equal('1');
        done();
      }).catch(done)
      // done();
      if (err) throw err;
      // done();
    });
  })
})
