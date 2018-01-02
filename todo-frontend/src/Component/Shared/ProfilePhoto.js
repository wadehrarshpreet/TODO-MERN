import React from 'react';

export class ProfilePhoto extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    const { src } = this.props;
    return(
      <img height={30} width={30} style={profilePhotoStyle} {...this.props} />
    )
  }
}

const profilePhotoStyle = {
  borderRadius: '15px'
}
