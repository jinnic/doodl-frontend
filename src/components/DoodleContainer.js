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

  showEditCanvas = (doodle) => {
      this.setState(prevState => ({
        editable: !prevState.editable,
        doodle: doodle
      }))

  }

  closeCanvas = () => {
    this.setState({
      editable: false
    })
  }

  renderDoodleCanvas = () => {
    if (this.state.editable === true) {
        return <DoodleCanvas user={this.props.user} closeCanvas={this.closeCanvas} handleUpdate ={this.props.handleUpdate} doodle={this.state.doodle}/>
    }
  }

  renderDoodle = () => {
    return (
      this.props.doodles.map(doodle =>  <DoodleCard 
        key={doodle.id}
        showEditCanvas={this.showEditCanvas} 
        handleUpdate={this.props.handleUpdate}
        handleDelete={this.props.handleDelete} 
        match = {this.props.match}
        page={this.props.page} key={doodle.id} 
        doodle={doodle}
        renderExisting={this.props.renderExisting}
        />)
      )
  }
  
  render() {
    return (
      <div>
        {this.renderDoodleCanvas()}
        {this.renderDoodle()} 
      </div>
    )
  }
}
export default DoodleContainer
