import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/index";
import APIIntegration from "./components/APIIntegration/index";
import Clipboard from "./components/Clipboard/index";
import Selfie from "./components/Selfie/index";

export default class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div id="home">
          <Header />
          <div id="view">
            <Route path="/apiintegration/" component ={APIIntegration}/>
            <Route path="/clipboard/" component ={Clipboard}/>
            <Route path="/selfie/" component ={Selfie}/>
            {/* {making API integration page to be default page} */}
            <Route exact path="/" component ={APIIntegration}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
