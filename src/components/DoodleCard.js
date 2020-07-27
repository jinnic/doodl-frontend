import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";



class Doodle extends Component {

  // getDoodleData =()=>{
  //   return fetch('http://localhost:3000/doodles')
  //     .then(r=>r.json())
  //     .then(doodles => this.renderDoodle(JSON.stringify(doodles[3].doodle_data)))

  // }
  
  // renderDoodle=(doodle)=>{
  //   this.loadableCanvas.loadSaveData(doodle)
  // }
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
      

      // debugger
  }

  handleEdit = () => {
    const doodle = this.props.doodle
    const doodleData = doodle.doodle_data
    const clicked = true 
    this.props.handleEditCanvas(doodle, clicked)
  }

  renderButtons = () => {
    if (this.props.page === "profile") {
     return <> 
      <button onClick={this.handleEdit}>edit</button>
      <button onClick={() => this.props.handleDelete(this.props.doodle.id)}>delete</button> 
     </>
    }
  }

  render() {
    // console.log("Doodle props : ", this.props)
    const doodle = this.props.doodle
    const doodleData = JSON.stringify(doodle.doodle_data)
    return (
      <div>

        {/* you can hideGrid or disabled for editting */}
        <h2>Title : {doodle.name}</h2>
        <CanvasDraw
          disabled
          hideGrid
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

export default Doodle