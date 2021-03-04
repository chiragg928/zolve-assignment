import React, { Component } from "react";
import "./style.css";

export default class Clipboard extends Component{

  state = {
    valueFromParams: ""
  }

  onChange = (e) => {
    this.setState({valueFromParams: e.target.value});
  }

  copyText = () =>{
    if(navigator && navigator.clipboard){
      navigator.clipboard.writeText(this.state.valueFromParams)
    }
    else if(window && window.clipboardData){
      window.clipboardData.setData("Text", this.state.valueFromParams)
    }
    if(this.inputRef){
      this.inputRef.focus();
      this.inputRef.setSelectionRange(0, this.inputRef.value.length);
    }
  }


  componentDidMount(){
    if(this.props && this.props.history && this.props.history.location) {
      // i wanted to do it using url params but in that case route doesn't does param name in url  
      // Andrequirement showed param to be visible in url
      this.setState({valueFromParams: new URLSearchParams(this.props.history.location.search).get('q')})
    }
  }

  render(){
    return(
      <div>
        <div className="pageHeading">Copy to clipboard</div>
        <div className="pageRow">
          <input type="text" className="clipboardInput" ref={ref =>{ this.inputRef = ref}} value={this.state.valueFromParams} onChange={this.onChange} />
        </div>
        <div className="pageRow">
          <button onClick={this.copyText}>Copy Text</button>
        </div>
      </div>
    )
  }
}