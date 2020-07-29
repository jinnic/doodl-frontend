import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";



class DoodleCard extends Component {

  handleClick=(e)=>{
      // let dataURL = canvas.toDataURL('image/png');
      // button.href = dataURL;
      // debugger
      let div = e.target.tagName === 'div' ? e.target : e.target.closest('div')
      let imgData = div.querySelectorAll('canvas')[1].toDataURL()
      let w=window.open('about:blank','image from canvas');
      w.document.write("<img src='"+imgData+"' alt='image from canvas'/>");
      console.log(imgData)
      // return imgData
  }

  handleEdit = () => {
    const doodle = this.props.doodle
    //this.props.showEditCanvas(doodle)
    this.props.renderExisting(doodle)
  }

  renderButtons = () => {
    if (this.props.match && this.props.match.url === "/profile") {
     return <> 
      <button data-toggle="modal" data-target="#canvasModal" onClick={this.handleEdit}>edit</button>
      <button onClick={() => this.props.handleDelete(this.props.doodle.id)}>delete</button> 
     </>
    }
  }

  renderInfo =()=>{
    const doodle = this.props.doodle
    if (!this.props.match) {
      return <> 
        <h2>Title : {doodle.name}</h2>
        <h5>Created by : {doodle.username}</h5>
      </>
     }
     return <h2>Title : {doodle.name}</h2>
  }
  render() {

    const doodle = this.props.doodle
    const doodleData = JSON.stringify(doodle.doodle_data)

    return (
      <div>

        {this.renderInfo()}
        <CanvasDraw
          disabled
          hideGrid
          immediateLoading={true}
          canvasWidth={doodle.width}
          canvasHeight={doodle.height}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={doodleData}
          
        />
        
        {this.renderButtons()}
      </div>
    )
  }

}

export default DoodleCard