import React, { Component } from 'react';
import DoodleContainer from './DoodleContainer';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import './App.css';

class App extends Component {
  
  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    // window.setInterval(() => {
    //   this.setState({
    //     color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    //   });
    // }, 2000);
  }

  sendDoodleData = () => {
    // let copiedDoodle = JSON.parse(this.state.doodle);

    let newObj = {}
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = 1
    newObj["name"] = "test"
    newObj.width = JSON.parse(this.state.doodle).width
    newObj.height = JSON.parse(this.state.doodle).height


    console.log(newObj)
    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
        body: JSON.stringify(newObj)
    }
    fetch('http://localhost:3000/doodles', config)
    .then(r => r.json())
    .then(console.log)
  }

  getDoodleData =()=>{
    fetch('http://localhost:3000/doodles')
      .then(r=>r.json())
      .then(doodles => JSON.stringify(doodles[0].doodle_data))

  }

  testLoadSaveData=()=>{

  }
  renderDoodle=(doodleObj)=>{

  }
  
  render() {
    return (
      <div>
        <DoodleContainer />
      </div>
    )
  }
}
export default App;
