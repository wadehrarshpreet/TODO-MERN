import {
  MARKED_DONE,FETCH_DATA,FETCHING_DATA,
  CREATE_TASK_END,CREATE_TASK_BEGIN,CREATE_TASK_FAIL,
  DELETE_TODO, DELETE_BEGIN
} from '../helper/config';

import _ from 'lodash';
const initialState = {
  data: [],
  loading: true,
  createLoading: false,
  createError: false
};

Array.prototype.getIndexBy = function (id, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][id] == value) {
            return i;
        }
    }
    return -1;
}
export default function appReducer(state = initialState, action) {
  let data;
  switch (action.type) {
    case FETCH_DATA:
      return {
        data: action.data || [],
        loading: false,
        createLoading: state.createLoading,
        createError: false
      }
    case FETCHING_DATA: {
      return {
          data: state.data,
          loading: true,
          createLoading: state.createLoading,
          createError: false
      }
    }
    case MARKED_DONE: {
      let data = state.data.map((task)=>{
        if(task._id == action.id)
          task.done = true;
        return task;
      })
      return {
        data: data,
        loading: false,
        createLoading: state.createLoading,
        createError: false
      }
    }
    case CREATE_TASK_BEGIN:
      return {
        data: state.data,
        loading: state.loading,
        createLoading: true,
        createError: false
      }
    case CREATE_TASK_FAIL:
      return {
        data: state.data,
        loading: state.loading,
        createLoading: false,
        createError: true
      }
    case DELETE_BEGIN:
      return {
        data: state.data,
        loading: state.loading,
        createLoading: true,
        createError: false,
        deleted: false
      }
    case DELETE_TODO:
      data = state.data;
      let ids = action.id;
      _.remove(data,(d)=> ids.indexOf(d._id) != -1);
      return {
        data,
        loading: state.loading,
        createLoading: false,
        createError: false,
        deleted: true
      }
    case CREATE_TASK_END:
      data = state.data;
      if(action.requestType == 'edit') {
        let index = data.getIndexBy("_id", action.data._id);
        data[index] = action.data;
      } else {
        let newData = [action.data];
        data = newData.concat(data);
      }
      return {
        data,
        loading: state.loading,
        createLoading: false,
        createError: false
      }
    default:
      return state;
  }
}
