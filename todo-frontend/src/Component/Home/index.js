import React from 'react';
import { ListData } from '../Shared';
import {Graph, GraphD} from '../'
import DateTimeField from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import {PRIORITIES} from '../../helper/config';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

export class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showAddModal: false,
      title: '',
      description: '',
      scheduleAt: new Date(new Date().getTime() + 3600000),
      editDetails: {},
      modalMode: ''
    },
    this.hideModal = this.hideModal.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  hideModal() {
    this.setState({ showAddModal: false })
  }
  editTask(task) {
    console.log(task);
    this.setState({
      showAddModal: true,
      modalMode: 'edit',
      title: task.title,
      description: task.description,
      editId: task._id,
      priority: task.priority,
      scheduleAt: task.scheduleAt || new Date()
   })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.createLoading === true && nextProps.createLoading === false) {
      this.setState({showAddModal: false, title: '', description: ''});
    }
  }
  render(){
    if(this.props.user && this.props.user.uid) {
      const {modalMode} = this.state;
      const {uid} = this.props.user;
      return(
        <div className="container">
          <div className="appHeader">
            <button className="btn btn-primary pull-right" onClick={()=>{
              this.setState({showAddModal: true, modalMode: 'add', title: '', description: '', editId:''});
            }}><i className="glyphicon glyphicon-plus"></i> Add ToDo</button>
            <h2 className="">Manage your Todo List</h2>
            <Graph data={this.props.data} />
            <ListData uid={uid} editTask={this.editTask} data={this.props.data} loading={this.props.loading}
              markAsDone={this.props.markAsDone}
              deleteTodo={this.props.deleteTodo}
              deleted={this.props.deleted}
            />
          </div>
          <Modal isOpen={this.state.showAddModal} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>{modalMode == 'edit' ? 'Edit' : 'Add'} TODO</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form role="form">
                    <div className="form-group">
                      <input
                        onChange={(e)=>{this.setState({title: e.target.value})}}
                        type="text" value={this.state.title}
                        className="form-control"
                        id="title"
                        name="title" placeholder="Task" required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <textarea value={this.state.description}
                        onChange={(e)=>{this.setState({description: e.target.value})}}
                        className="form-control" type="textarea" id="description" placeholder="Description" maxLength="140" rows="5"
                      />
                    </div>
                    <div className="form-group">
                      <label className='formLabel'>Priority</label>
                      <select className="form-control" defaultValue={0}
                        value={this.state.priority}
                        onChange={e => this.setState({priority:e.target.value})}
                      >
                        {
                          PRIORITIES.map((type,i)=> <option key={i} value={i}>{type}</option>)
                        }
                      </select>

                    </div>
                    <div className="form-group">
                      <label className='formLabel'>Task should completed by:</label>
                      <DateTimeField
                        value={new Date(this.state.scheduleAt)}
                        onChange={date => {
                          this.setState({scheduleAt: new Date(date._d)})
                        }}
                      />
                    </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Close
              </button>
              <button className='btn btn-primary' onClick={()=>{
                const title = this.state.title;
                const description = this.state.description;
                const scheduleAt = new Date(this.state.scheduleAt).getTime();
                const priority = this.state.priority || 0;
                let req = {
                  title,
                  description,
                  scheduleAt,
                  uid,
                  priority,
                  editId: this.state.editId
                }
                if(title && uid){
                  this.props.createTask(req);
                }
              }} disabled={this.props.createLoading}>
                {modalMode == 'edit' ? 'Update' : 'Add Task'}
              </button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Hello World</h1>
          <p>Manage your ToDo List!! Login Now to start...</p>
        </div>
      </div>
    )
  }
}
