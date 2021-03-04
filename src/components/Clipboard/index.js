import React, { Component } from "react";

export default class Clipboard extends Component{

  state = {
    valueFromParams: ""
  }

  copyText = () =>{
    if(navigator && navigator.clipboard){
      navigator.clipboard.writeText(this.state.valueFromParams)
    }
    else if(window && window.clipboardData){
      window.clipboardData.setData("Text", this.state.valueFromParams)
    }
  }


  componentDidMount(){
    if(this.props && this.props.match && this.props.match.params) {
      this.setState({valueFromParams: this.props.match.params.q})
    }
  }

  render(){
    return(
      <div>
        <div className="pageHeading">Copy to Clipboard example</div>
        <input type="text" value={this.state.valueFromParams} disabled />
        <button onClick={this.copyText}>Copy Text</button>
      </div>
    )
  }
}