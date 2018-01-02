import React from 'react';
import {Link} from 'react-router-dom';
import { ProfilePhoto } from './';

export class Header extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const { user } = this.props;
    return(
      <nav className="navbar navbar-default">
      <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">ToDo</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          {user?<li><a href="#" style={{padding: '10px'}}>Hi, <ProfilePhoto src={user.photoURL} /> {user.displayName} </a></li>:null}
          <li><a onClick={()=>{
            if(user) this.props.logout();
            else this.props.loginWithGoogle();
          }} className='loginButton'>{user?'Logout':'Login With Google'}</a></li>
        </ul>
      </div>
    </nav>

    )
  }
}
