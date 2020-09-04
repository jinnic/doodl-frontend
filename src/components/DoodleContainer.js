import React, { Component } from 'react';
import DoodleCard from "./DoodleCard"


class DoodleContainer extends Component {

  state = {
    editable: false,
    doodle: {}
  }

  // showEditCanvas = (doodle) => {
  //     this.setState(prevState => ({
  //       editable: !prevState.editable,
  //       doodle: doodle
  //     }))

  // }

  // closeCanvas = () => {
  //   this.setState({
  //     editable: false
  //   })
  // }

  // renderDoodleCanvas = () => {
  //   if (this.state.editable === true) {
  //       return <DoodleCanvas user={this.props.user} closeCanvas={this.closeCanvas} handleUpdate ={this.props.handleUpdate} doodle={this.state.doodle}/>
  //   }
  // }

  renderDoodle = () => {
    return (
      this.props.doodles.map(doodle =>  <DoodleCard 
        key={doodle.id}
        renderExisting={this.props.renderExisting}
        showEditCanvas={this.showEditCanvas} 
        handleUpdate={this.props.handleUpdate}
        handleDelete={this.props.handleDelete} 
        match={this.props.match}
        page={this.props.page}
        doodle={doodle}
        updateLike={this.props.updateLike} 
        user={this.props.user} 
        />)
      )
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          {this.renderDoodle()} 
        </div>
      </div>
    )
  }
}
export default DoodleContainer
