const { expect } = require('chai');
const mongoose = require('mongoose');
const assert = require('assert');
const request = require('supertest');
const app = require('../App');
const TODO = mongoose.model('todolist');

describe('List Todo List', function(){
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
  it('ListTODO', (done)=>{
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
      request(app)
      .get(`/api/todo/1`)
      .expect('Content-Type', /json|text/)
      .expect(200)
      .end(function(err,res){
        expect(res.body.data.length).to.equal(1);
        done();
      })
    });
  })
})
