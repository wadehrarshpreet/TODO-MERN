import React from 'react';
import { ListData } from '../Shared';
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
      newTitle: '',
      newDesc: ''
    },
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({ showAddModal: false })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.createLoading === true && nextProps.createLoading === false)
      this.setState({showAddModal: false});
  }
  render(){
    if(this.props.user) {
      const {uid} = this.props.user;
      return(
        <div className="container">
          <div className="appHeader">
            <button className="btn btn-primary pull-right" onClick={()=>{
              this.setState({showAddModal: true});
            }}><i className="glyphicon glyphicon-plus"></i> Add ToDo</button>
            <h2 className="">Manage your Todo List</h2>
            <ListData uid={uid} data={this.props.data} loading={this.props.loading} markAsDone={this.props.markAsDone}/>
          </div>
          <Modal isOpen={this.state.showAddModal} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Add TODO</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <form role="form">
                    <div className="form-group">
                      <input
                        onChange={(e)=>{this.setState({newTitle: e.target.value})}}
                        type="text" value={this.state.newTitle} className="form-control" id="title" name="title" placeholder="Task" required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <textarea value={this.state.newDesc}
                        onChange={(e)=>{this.setState({newDesc: e.target.value})}}
                        className="form-control" type="textarea" id="description" placeholder="Description" maxLength="140" rows="5"
                      />
                    </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Close
              </button>
              <button className='btn btn-primary' onClick={()=>{
                const title = this.state.newTitle;
                const desc = this.state.newDesc;
                if(title && uid)
                  this.props.createTask(title,desc,uid);
              }} disabled={this.props.createLoading}>
                Add Task
              </button>
            </ModalFooter>
          </Modal>
        </div>
      )
    }
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>Hello World</h1>
          <p>Manage your ToDo List!! Login Now to start...</p>
        </div>
      </div>
    )
  }
}
