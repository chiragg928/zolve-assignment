import React, { Component } from "react";
import axios from "axios";
import AmCharts from "@amcharts/amcharts3-react";

export default class APIExample extends Component{
  constructor(){
    super();
    this.state = {
      fromdate : "",
      todate : "",
      pagesize : 1,
      page : 1,
      data:[]
    }
  }

  onChange = (e) =>{
    const { value, name } = e.target;
    this.setState({[name]: value});
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const { fromdate, todate, pagesize, page } = this.state;
    this.fetchData(fromdate,todate,pagesize,page)
    .then(res=>{
      console.log(JSON.stringify(res));
      this.setState({data: res.data.items})
    })
    .catch(err=>{
      console.log(err);
    })
  }

  fetchData = ( fromdate, todate, pagesize, page) =>{
    // console.log("fromDate",fromdate);
    // console.log("toDate",todate);
    // console.log("pageSize",pagesize);
    // console.log("page",page);
    return new Promise((resolve,reject)=>{
      axios({
        method: "GET",
        url: "https://api.stackexchange.com/2.2/tags",
        params: {fromdate,todate,pagesize,page,site:"stackoverflow"}
      })
      .then((response)=>{
        resolve(response);
      })
      .catch((error)=>{
        reject(error);
      })
    })
  }

  render(){
    const { fromdate, todate, pagesize, page } = this.state;

    return(
      <div>
        <h4>API Integration example</h4>
        <form onSubmit={this.onSubmit}>
          <div className="formRow">
          <label htmlFor="fromdate">From Date</label>
          <input id="fromdate" type="date" name="fromdate" onChange={this.onChange} value={fromdate} />
          </div>
          <div className="formRow">
          <label htmlFor="todate">To Date</label>
          <input id="todate" type="date" name="todate" onChange={this.onChange} value={todate} />
          </div>
          <div className="formRow">
          <label htmlFor="pagesize">Page Size</label>
          <input id="pagesize" type="number" name="pagesize" onChange={this.onChange} value={pagesize} />
          </div>
          <div className="formRow">
          <label htmlFor="page">Page</label>
          <input id="page" type="number" name="page" onChange={this.onChange} value={page} />
          </div>
          <div className="formRow">
          <input type="submit" value="Fetch Data" />
          </div>
        </form>
        <div style={{height:"300px"}}>
          <AmCharts.React
            style={{
              width: "100%",
              height: "100%"
            }}
            options={{
              "type": "serial",
              "theme": "none",
              "dataProvider": this.state.data,
              "valueAxes": [ {
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
              } ],
              "gridAboveGraphs": true,
              "startDuration": 1,
              "graphs": [ {
                "balloonText": "[[name]]: <b>[[count]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "count"
              } ],
              "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
              },
              "categoryField": "name",
              "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
              },
              "export": {
                "enabled": true
              }
            }
            } 
            />
        </div>
      </div>
    )
  }
}