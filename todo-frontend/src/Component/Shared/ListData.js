import React from 'react';
import { Loader, ListItem } from './';
import moment from 'moment';

export class ListData extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      singlePageEntries: localStorage.singlePageEntries || 10,
      active: 0,
      selectedTodo: [],
      deleteStart: false,
      filterType: 0
    }
    this.tick = this.tick.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.changeSinglePageEntries = this.changeSinglePageEntries.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  tick() {
	    this.setState({time: new Date().getTime()});
	}

  componentDidMount() {
    this.interval = setInterval(this.tick, 10000);
  }

  componentWillUnmount() {
    	clearInterval(this.interval);
	}
  changeSinglePageEntries(e) {
    this.setState({singlePageEntries: e.target.value, active: 0});
    localStorage.setItem('singlePageEntries', e.target.value);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.deleted) {
      this.setState({deleteStart: false, selectedTodo: []})
    }
  }

  changeSelect(id) {
    let selectedTodo = this.state.selectedTodo || [];
    let index = selectedTodo.indexOf(id);
    if(index == -1)
      selectedTodo.push(id);
    else {
      selectedTodo.splice(index, 1);
    }
    this.setState({selectedTodo});
  }

  deleteTodo() {
    let selectedTodo = this.state.selectedTodo || [];
    if(selectedTodo.length > 0)
    this.setState({deleteStart: true});
    this.props.deleteTodo(selectedTodo, this.props.uid);
  }

  pagination(totalPage) {
    let selectedTodo = this.state.selectedTodo || [];
    let singlePageEntries = parseInt(this.state.singlePageEntries);
    let active = this.state.active || 0;
    return (
      <div className="page">
        <div className='pull-right marginR20'>
          <select onChange={(e)=> this.setState({filterType: e.target.value, active: 0})}>
            <option value='0'>All</option>
            <option value='1'>Pending</option>
            <option value='2'>Completed</option>
          </select>&nbsp;
          <button
            className="btn btn-danger btn-sm" disabled={this.state.deleteStart}
            onClick={this.deleteTodo}>Delete {selectedTodo.length? `(${selectedTodo.length})` : ''}
          </button> &nbsp;
          <select onChange={this.changeSinglePageEntries} value={singlePageEntries}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30" >30</option>
            <option value="50">50</option>
          </select>
        </div>

        <ul className="pagination">
          {
            Array.apply(0, Array(totalPage)).map((a,i)=>{
              return (
                <li key={i} className={i == active ? 'active': ''} onClick={(e)=>{
                  e.preventDefault();
                  this.setState({active: i});
                }}><a href="#">{i+1}</a></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  render(){
    if(this.props.loading)
      return <Loader />
    let data = this.props.data || [];
    let selectedTodo = this.state.selectedTodo || [];
    let singlePageEntries = parseInt(this.state.singlePageEntries);
    let filterType = this.state.filterType;
    if(filterType == 1)
      data = _.filter(data,d=>!d.done)
    else if(filterType == 2)
      data = _.filter(data,d=>d.done)
    let totalPage = Math.ceil(data.length / singlePageEntries);
    let active = this.state.active || 0;
    let start = parseInt(active) * parseInt(singlePageEntries);
    data = data.slice(start, start + singlePageEntries);
    const uid = this.props.uid;
    if(data.length > 0)
      return (
        <div style={{marginBottom: '20px'}}>
        {this.pagination(totalPage)}
        <div className="table-responsive">
        <table className="table margin0 todoList">
      		<thead>
      			<tr>
      				<th></th>
      				<th>Task</th>
      				<th>Description</th>
      				<th>TimeLeft</th>
      				<th>Priority</th>
      				<th>Created</th>
              <th>Action</th>
      			</tr>
      		</thead>

      		<tbody id="table">
            {
              data.map((task,index)=>{
                let _index = selectedTodo.indexOf(task._id);
                return (
                  <ListItem
                    selected={_index != -1}
                    editTask={this.props.editTask} data={task}
                    markAsDone={this.props.markAsDone} key={index}
                    uid={uid}
                    changeSelect={this.changeSelect}
                  />
                )
              })
            }
      		</tbody>
      	</table>
        </div>
        {this.pagination(totalPage)}
        </div>
      )
   return (
     <h3 style={{textAlign: 'center'}}>
      TODO List is empty
     </h3>
   )
  }
}
