import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import DoodleCanvas from "./DoodleCanvas"
import DoodleCard from "./DoodleCard"

class DoodleContainer extends Component {
  state = {
    editable: false,
    doodle: {}
  }

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



  handleEditCanvas = (doodle, clicked) => {
      this.setState({
        editable: clicked,
        doodle: doodle
      })

  }

  closeCanvas=()=>{
    this.setState({
      editable : false
    })
  }
  renderDoodleCanvas = () => {
    if (this.state.editable === true) {
        return (
      //   <CanvasDraw
      //   hideGrid
      //   canvasWidth={400}
      //   canvasHeight={400}
      //   ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
      //   saveData={this.state.doodleData}
      // />
       <DoodleCanvas closeCanvas={this.closeCanvas} doodle={this.state.doodle}/>
      )
    }
  }

  renderDoodle=()=>{
    return this.props.doodles.map(doodle =>  <DoodleCard handleEditCanvas={this.handleEditCanvas} handleDelete={this.props.handleDelete} page={this.props.page} key={doodle.id} doodle={doodle}/>)
  }
  
  render() {
    console.log(this.props.doodles)
    return (
      <div>
        {this.renderDoodleCanvas()}
        {this.renderDoodle()} 
      </div>
    )
  }
}
export default DoodleContainer
