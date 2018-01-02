import {
  MARKED_DONE,FETCH_DATA,FETCHING_DATA,
  CREATE_TASK_END,CREATE_TASK_BEGIN,CREATE_TASK_FAIL
} from '../helper/config';

import _ from 'lodash';
const initialState = {
  data: [],
  loading: true,
  createLoading: false,
  createError: false
};
export default function appReducer(state = initialState, action) {
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
    case CREATE_TASK_END:
      let newData = [action.data];
      let data = newData.concat(state.data);
      return {
        data: data,
        loading: state.loading,
        createLoading: false,
        createError: false
      }
    default:
      return state;
  }
}
