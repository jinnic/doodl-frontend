import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import DoodleCanvas from "./DoodleCanvas"
import Doodle from "./Doodle"

class DoodleContainer extends Component {
  state = {
    doodles: []
  }

  //Fetch all saved Doodle
  componentDidMount() {

    fetch('http://localhost:3000/doodles')
        .then(r=>r.json())
        .then(doodles => this.setState(
                                {doodles: doodles},
                                ()=>console.log('Fetched all saved Doodles ',this.state.doodles)
                              )
        )
  }
  
  //Render Doodle passing stringified JSON as doodle
  renderDoodle=()=>{
    return this.state.doodles.map(doodle =>  <Doodle doodle={JSON.stringify(doodle.doodle_data)}/>)
  }

  addNewDoodle=(doodle)=>{
    this.setState(preState =>({
      doodles: [...preState.doodles, doodle]
    }),
    ()=>console.log('Add New Doodles ',this.state.doodles)
    )
  }
  
  render() {
    return (
      <div>
        <DoodleCanvas addNewDoodle={this.addNewDoodle} />
        {this.renderDoodle()}
      </div>
    )
  }
}
export default DoodleContainer
