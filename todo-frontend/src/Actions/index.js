import {
  MARKED_DONE,FETCH_DATA,FETCHING_DATA,
  CREATE_TASK_END,CREATE_TASK_BEGIN,CREATE_TASK_FAIL,
  ENV
} from '../helper/config';

let baseURL = 'http://localhost:4000';
if(ENV == 'PROD')
  baseURL = '';
export const actionCreator = {
  getData:(uid) => (dispatch, getState) => {
    fetch(`${baseURL}/api/todo/${uid}`)
    .then(response => response.json())
    .then(data=>{
      dispatch({
        type: FETCH_DATA,
        data: data.data || []
      });
    })
    .catch(err=> console.log(err.reason));
    dispatch({
      type: FETCHING_DATA
    });
  },
  markAsDone: (id) => (dispatch, getState) => {
    fetch(`${baseURL}/api/done/${id}`,{
      method: 'PUT'
    })
    .then(response => response.json())
    .then(data=>{
      dispatch({
        type: MARKED_DONE,
        id: id
      })
    })
    .catch(err=> console.log(err.reason));
  },
  createTask: (title, desc, uid) => (dispatch, getState) => {
    let request = {
      uid,
      title,
      description: desc
    }
    let data = '';
    for (let entry in request) {
        data += entry + '=' + encodeURIComponent(request[entry]) + '&';
    }
    fetch(`${baseURL}/api/add`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    }).then(response => response.json()).then(data => {
      if(data.success)
        dispatch({
          type: CREATE_TASK_END,
          data: data.data
        })
      else
        dispatch({
          type: CREATE_TASK_FAIL
        })
    });
    dispatch({
      type: CREATE_TASK_BEGIN
    })
  }
}
