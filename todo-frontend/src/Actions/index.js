import {
  MARKED_DONE,FETCH_DATA,FETCHING_DATA,
  CREATE_TASK_END,CREATE_TASK_BEGIN,CREATE_TASK_FAIL,
  ENV, DELETE_TODO, DELETE_BEGIN
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
  deleteTodo: (id, uid) => (dispatch, getState) => {
    let data = '';
    let payload = {
      id,
      uid
    }
    if(id.length < 0)
      return;
    for (let entry in payload) {
      if(typeof payload[entry] == "object") {
        let list: string[] = payload[entry];
        list.forEach((option: string) => {
            data+= entry+'='+encodeURIComponent(option) + '&';
        })
      } else {
          data += entry + '=' + encodeURIComponent(payload[entry]) + '&';
      }
    }
    dispatch({type: DELETE_BEGIN});
    fetch(`${baseURL}/api/delete`,{
      method: 'POST',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
    .then(response => response.json())
    .then(data=>{
      dispatch({
        type: DELETE_TODO,
        id: data.id
      })
    })
    .catch(err=> console.log(err.reason));
  },
  createTask: (request) => (dispatch, getState) => {
    let requestType = 'add';
    if(request.editId){
      requestType = 'edit';
    }
    let data = '';
    for (let entry in request) {
        if(request[entry])
        data += entry + '=' + encodeURIComponent(request[entry]) + '&';
    }
    fetch(`${baseURL}/api/${requestType}`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    }).then(response => response.json()).then(data => {
      if(data.success)
        dispatch({
          type: CREATE_TASK_END,
          data: data.data,
          requestType: requestType
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
