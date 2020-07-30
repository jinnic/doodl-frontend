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
      return (
        <> 
          <p>{doodle.name}</p>
          <p>created by {doodle.username}</p>
        </>
      )
     }
     return <h2>{doodle.name}</h2>
  }

  render() {

    const doodle = this.props.doodle
    const doodleData = JSON.stringify(doodle.doodle_data)

    return (
      <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 grid-gap">
        <div className="doodle-card">
          <div class="fake-canvas">

            <CanvasDraw
            immediateLoading={true}
              disabled
              hideGrid
              canvasWidth={500}
              canvasHeight={450}
              ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
              saveData={doodleData}
              className="img-fluid disabled-canvas"
            />

        </div>
        <div className="like-title-container">

          <span>
            {this.renderInfo()}
            {this.renderButtons()}
          </span>
          <span className="like">♡</span>
          
        </div>
        </div>
      </div>
    )
  }
}

export default DoodleCard