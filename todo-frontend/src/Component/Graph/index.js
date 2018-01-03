import React from 'react';
import moment from 'moment';
import * as d3 from "d3";
import _ from 'lodash';

export class Graph extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
    this.processData = this.processData.bind(this);
    this.onRef = this.onRef.bind(this);
  }

  processData(isUpdate) {
    let data = this.props.data || [];
    if(data.length < 5) return;
    const svg = d3.select(ref);
    const ref = this.svg;
    let width = ref.clientWidth;
    const rectWid = 20;
    const height = ref.clientHeight - 20;
    let obj = {}
    data.forEach(_data => {
      let key = d3.timeFormat("%b-%d-%y")(new Date(_data.createdAt));
      if(obj[key])
        obj[key]++;
      else
        obj[key] = 1;
    });
    data = d3.map(obj).entries();
    let xMin = d3.min(data, d => new Date(d.key));
    xMin = new Date(new Date(xMin).getTime() - 172800000)
    const xMax = new Date(new Date(xMin).getTime() + 1296000000);
    const xScale = d3.scaleTime()
        .domain([xMin, xMax])
        .range([20, width -20])
    const yMax = d3.max(data, d => d.value);
    const yScale = d3.scaleLinear()
          .domain([0,yMax + 1])
          .range([height - 20, 20]);
    const xAxis = d3.axisBottom()
      .ticks(10)
    	.scale(xScale);
    const yAxis = d3.axisLeft()
      .ticks(10)
    	.scale(yScale);
    const t = d3.transition().duration(500);
    let _bar = d3.select(ref)
      .selectAll('rect')
      .data(data, d=>d.key)
      .enter().append('rect');
      _bar.attr('x', (d, i) => xScale(new Date(d.key)))
      .attr('height', d => height - yScale(d.value))
      .attr('width', rectWid)
      .transition(t)
      .attr('y', d => yScale(d.value))
      .attr('fill', '#7f7f7f')
      .attr('stroke', '#fff');

    if(!isUpdate) {
      d3.select(ref)
        .append('g')
        .attr("class", "x-axis")
      	.attr('transform', `translate(0, ${height})`)
      	.call(xAxis)
      d3.select(ref)
        .append('g')
        .attr("class", "y-axis")
      	.attr('transform', `translate(${20},0)`)
      	.call(yAxis)
    } else {
      d3.select(ref)
        .selectAll("g.x-axis")
      	.call(xAxis)
      d3.select(ref)
        .selectAll("g.y-axis")
        .call(yAxis)
    }

  }

  onRef(ref) {
    this.svg = ref;
    this.processData();
  }
  componentDidMount() {

  }

  componentDidUpdate(nextProps, nextState) {
      this.processData(true);
  }

  render() {
    if(this.props.data.length < 5)
      return null;
    return (
      <svg ref={this.onRef} style={{ height: '420px', width: '100%', marginLeft: '20px', marginBottom: '20px'}}></svg>
    )
  }
}
