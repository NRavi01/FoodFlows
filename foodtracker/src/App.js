import React, {useState, useEffect, Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Store from './Components/Store';
import Contact from './Components/Contact';
import ScriptTag from 'react-script-tag';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };


  }
  //
  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Store data={this.state.resumeData.main}/>
        <ScriptTag type="text/javascript" src="/assets.js" />
      </div>
    );
  }
}

export default App;
