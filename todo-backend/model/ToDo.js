const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  createdAt: Date,
  done: {
    type: Boolean,
    default: false
  }
});

const todoList = mongoose.model('todolist', ToDoSchema);
module.exports = todoList;
