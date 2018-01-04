import React from 'react';
import moment from 'moment';
import * as d3 from "d3";
import _ from 'lodash';
export * from './graph';

const dayPadding = 3;
const dayPaddingInMS = 3 * 24 * 60 * 60 * 1000;
const margin = 20;
export class Graph extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.processData = this.processData.bind(this);
    this.onRef = this.onRef.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  processData(isUpdate, resize = false) {
    let data = this.props.data || [];
    if(data.length < 5) return;
    const ref = this.svg;
    if(!ref)
      return;
    const svg = d3.select(ref);
    let width = ref.clientWidth;
    const rectWid = width/40;
    const height = ref.clientHeight - margin;
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
    xMin = new Date(new Date(xMin).getTime() - dayPaddingInMS)
    let xMax = d3.max(data, d => new Date(d.key));
    xMax = new Date(new Date(xMax).getTime() + dayPaddingInMS);
    const xScale = d3.scaleTime()
        .domain([xMin, xMax])
        .range([margin, width -margin])
    const yMax = d3.max(data, d => d.value);
    const yScale = d3.scaleLinear()
          .domain([0,yMax + 1])
          .range([height - margin, margin]);
    const xAxis = d3.axisBottom()
    	.scale(xScale);
    const yAxis = d3.axisLeft()
      .ticks(10)
    	.scale(yScale);

    const t = d3.transition().duration(300);
    if(resize) //responsive
    {
      d3.select(ref)
      .selectAll('rect')
      .remove()
    }
    let _bar = d3.select(ref)
      .selectAll('rect')
      .data(data, d=>d.value)
      .enter().append('rect');
      if(isUpdate)
        _bar.exit().transition(t).remove();
      _bar.attr('x', (d, i) => xScale(new Date(d.key)))
      .attr('height', d => height - yScale(d.value))
      .attr('width', rectWid);
      if(!resize)
        _bar.transition(t);
      _bar.attr('y', d => yScale(d.value))
      .attr('fill', '#7f7f7f')
      .attr('stroke', '#fff');
    if(!isUpdate) {
      svg
        .append('g')
        .attr("class", "x-axis")
      	.attr('transform', `translate(0, ${height})`)
      	.call(xAxis)
      svg
        .append('g')
        .attr("class", "y-axis")
      	.attr('transform', `translate(${margin},0)`)
      	.call(yAxis)
    } else {
      svg
        .selectAll("g.x-axis")
      	.call(xAxis)
      svg
        .selectAll("g.y-axis")
        .call(yAxis)
    }

  }
  handleResize() {
    this.processData(true,true);
  }
  onRef(ref) {
    this.svg = ref;
    setTimeout(()=>{
      this.processData();
    },100)
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.data.length != this.props.data.length)
      return true;
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
      this.processData(prevProps.data.length != 0);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    if(this.props.data.length < 5)
      return null;
    return (
      <svg ref={this.onRef} style={{ height: '420px', width: '100%', marginLeft: '20px', marginBottom: '20px'}}></svg>
    )
  }
}
