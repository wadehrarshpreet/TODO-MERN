import React from 'react';
import { Loader, ListItem } from './';
import moment from 'moment';

export class ListData extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
    this.tick = this.tick.bind(this);
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
  render(){
    if(this.props.loading)
      return <Loader />
    const data = this.props.data || [];
    const uid = this.props.uid;
    if(data.length > 0)
      return (
        <div>
        <table className="table">
      		<thead>
      			<tr>
      				<th>Task</th>
      				<th>Description</th>
      				<th>TimeStamp</th>
              <th>Action</th>
      			</tr>
      		</thead>

      		<tbody id="table">
            {
              data.map((task,index)=>{
                return (
                  <ListItem data={task} markAsDone={this.props.markAsDone} key={index} uid={uid} />
                )
              })
            }
      		</tbody>
      	</table>
        </div>
      )
   return (
     <h3 style={{textAlign: 'center'}}>
      TODO List is empty
     </h3>
   )
  }
}
