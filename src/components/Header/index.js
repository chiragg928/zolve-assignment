import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component{
  render(){
    return(
      <div id="header">
        <Link to="/apiintegration" className="routeLink">API Integration</Link>
        <Link to="/clipboard/hello" className="routeLink">Clipboard</Link>
        <Link to="/selfie" className="routeLink">Selfie</Link>
      </div>
    )
  }
}