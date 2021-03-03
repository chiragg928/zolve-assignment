import React, { Component } from "react";
import axios from "axios";

export default class APIExample extends Component{
  constructor(){
    super();
    this.state = {
      fromdate : "",
      todate : "",
      pagesize : 1,
      page : 1
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
        <div style={{height:"300px",width:"300px",background:"red"}}>
        
        </div>
      </div>
    )
  }
}