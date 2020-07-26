import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import DoodleCanvas from "./DoodleCanvas"
import DoodleCard from "./DoodleCard"

class DoodleContainer extends Component {
  // state = {
  //   doodles: []
  // }

  // //Fetch all saved Doodle
  // componentDidMount() {

  //   fetch('http://localhost:3000/doodles')
  //       .then(r=>r.json())
  //       .then(doodles => this.setState(
  //                               {doodles: doodles.reverse()},
  //                               ()=>console.log('Fetched all saved Doodles ',this.state.doodles)
  //                             )
  //       )
  // }
  
  //Render Doodle passing stringified JSON as doodle : doodle={JSON.stringify(doodle.doodle_data)}
  renderDoodle=()=>{
    return this.props.doodles.map(doodle =>  <DoodleCard key={doodle.id} doodle={doodle}/>)
  }

  // addNewDoodle=(doodle)=>{
  //   this.setState(preState =>({
  //     doodles: [doodle, ...preState.doodles]
  //   }),
  //   ()=>console.log('Add New Doodles ',this.state.doodles)
  //   )
  // }
  
  render() {
    console.log(this.props.doodles)
    return (
      <div>
        {/* <DoodleCanvas addNewDoodle={this.addNewDoodle} />*/}
        {this.renderDoodle()} 
      </div>
    )
  }
}
export default DoodleContainer
