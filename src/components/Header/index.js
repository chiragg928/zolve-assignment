import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default class Header extends Component{
  render(){
    return(
      <div id="header">
        <Link to="/apiintegration" className="routeLink">API Integration</Link>
        <Link to="/clipboard?q=value-read-from-params" className="routeLink">Clipboard</Link>
        <Link to="/selfie" className="routeLink">Selfie</Link>
      </div>
    )
  }
}