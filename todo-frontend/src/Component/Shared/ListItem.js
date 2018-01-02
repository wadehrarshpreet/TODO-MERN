import React from 'react';
import moment from 'moment';

export class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }

  render(){
    const task = this.props.data || {};
    const uid = this.props.uid;
    return (
      <tr>
        <td>
          {task.title}
        </td>
        <td>
          {task.description}
        </td>
        <td>
          {moment(task.createdAt).fromNow()}
        </td>
        <td>
          {task.done ?
            <button type="button" className="btn btn-sm btn-sucess" disabled>Completed</button>
          :
            <button type="button" disabled={this.state.loading} className="btn btn-sm btn-info" onClick={()=>{
              this.setState({loading: true});
              this.props.markAsDone(task._id, uid);
            }}>Mark as Done</button>
          }
        </td>
      </tr>
    )
  }
}
