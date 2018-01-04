import React from 'react';
import { Header, Home } from '../Component/';
import { Router, Switch, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { actionCreator } from '../Actions';

import FirebaseHelper, { firebaseAuth } from '../helper/firebase';

import '../Style/style.scss';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    let user = null;
    if(window.localStorage.user && JSON.parse(window.localStorage.user).uid)
      user = JSON.parse(window.localStorage.user);
    this.state = {
      user,
      data: []
    }
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      this.setState({user});
      if(user){
        this.props.getData(this.state.user.uid);
        window.localStorage.setItem('user',JSON.stringify(user));
        window.localStorage.setItem('userId',JSON.stringify(user.uid));
      }
      else
        window.localStorage.removeItem('user');
    });
  }

  loginWithGoogle() {
    FirebaseHelper.loginWithGoogle((obj)=>{
      this.setState({user: obj.user, userId: obj.uid})
    });
  }

  logout() {
    FirebaseHelper.logout();
    this.setState({ user: undefined });
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userId');
  }
  render() {
    let {data, loading, createLoading} = this.props;
    if(!this.state.user)
      data = [];
    return (
      <div>
        <Header active={this.props.active} user={this.state.user} logout={this.logout} loginWithGoogle={this.loginWithGoogle} />
        <main>
          <Switch>
        		<Route exact path="/" render={() =>
              <Home
                user={this.state.user}
                data={data}
                createLoading={createLoading}
                createTask={this.props.createTask}
                loading={loading}
                markAsDone={this.props.markAsDone}
                deleteTodo={this.props.deleteTodo}
                deleted={this.props.deleted}
              />
            }/>
  	     </Switch>
        </main>
      </div>
    )
  }
}

export default connect((state)=> state.userData, actionCreator)(AppLayout)
