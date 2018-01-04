import React from 'react';
import moment from 'moment';
import {PRIORITIES} from '../../helper/config';

moment.updateLocale('en', {
    relativeTime : {
        future: "%s"
    }
});


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
    let scheduleAt = new Date(task.scheduleAt || new Date().getTime());
    let priority = task.priority || 0;
    let isPassed = scheduleAt.getTime() - new Date().getTime();
    return (
      <tr onClick={(e)=>{
          if(e.target.tagName != 'I')
          this.props.changeSelect(task._id)
        }}>
        <td><input checked={this.props.selected} type="checkbox" className="itemSelection"/></td>
        <td>
          {task.title}
        </td>
        <td>
          {task.description}
        </td>
        <td className={(isPassed < 0)? 'red': ''}>
          {
            task.done?
            'Task Completed about ' + moment(task.completedAt).fromNow()
            :
            isPassed < 0?
              'Late: Task should Completed about ' + moment(scheduleAt).fromNow()
              :
              moment(scheduleAt).fromNow()
          }
        </td>
        <td>
          {PRIORITIES[priority]}
        </td>
        <td>
          {moment(new Date(task.createdAt)).fromNow()}
        </td>
        <td>
          {task.done ?
            <button type="button" className="btn btn-sm btn-sucess" disabled>Completed</button>
          :
            <div className="row">
              <div className="col-sm-6 padLR10">
              <button type="button" disabled={this.state.loading} className="form-control btn btn-sm btn-info" onClick={()=>{
                this.setState({loading: true});
                this.props.markAsDone(task._id, uid);
              }}><i className="glyphicon glyphicon-ok" /></button>
              </div>
              <div className="col-sm-6 padLR10">
              <button type="button" disabled={this.state.loading} className="form-control btn btn-sm btn-default" onClick={()=>{
                this.props.editTask(task);
              }}><i className="glyphicon glyphicon-edit" /></button>
              </div>
            </div>
          }
        </td>
      </tr>
    )
  }
}
