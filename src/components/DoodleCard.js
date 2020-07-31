import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";



class DoodleCard extends Component {

  state = {
    likeStatus: ""
  }
  componentDidMount() {
    this.setState({
      likeStatus: this.props.doodle.likes.length > 0 ? true : false
    })
  }


  handleLike = () => {
    // this.props.likeUpdate(this.props.doodle)
    this.setState(prevState => ({
      likeStatus: !prevState.likeStatus
    }))
  }

  handleClick=(e)=>{
      // let dataURL = canvas.toDataURL('image/png');
      // button.href = dataURL;
      // debugger
      // let div = e.target.tagName === 'div' ? e.target : e.target.closest('.disabled-canvas')
      let imgData = e.target.closest('.like-title-container').previousElementSibling.querySelectorAll('canvas')[1].toDataURL()
      let w=window.open('about:blank','image from canvas');
      w.document.write("<img src='"+imgData+"' alt='image from canvas'/>");
      console.log(imgData)
      return imgData
  }

  handleEdit = () => {
    const doodle = this.props.doodle
    this.props.renderExisting(doodle)
  }

  renderButtons = (doodleData) => {
    if (this.props.match && this.props.match.url === "/profile") {
     return <span className="edit-delete"> 
      <button className="button" data-toggle="modal" data-target="#canvasModal" onClick={this.handleEdit}>edit</button>
      <button className="button" onClick={() => this.props.handleDelete(this.props.doodle.id)}>delete</button> 
      {/* <button className="button" onClick={()=> this.loadableCanvas.loadSaveData(doodleData)} >load</button>  */}
      <svg onClick={this.handleClick} width="1.3em" height="1.3em" viewBox="0 0 16 16" className="align-bottom bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
        <path fill-rule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
      </svg>
     </span>
    }
  }

  renderInfo =()=>{
    const doodle = this.props.doodle
    if (!this.props.match) {
      return (
          <p className="created-by">created by {doodle.username}</p>
      )
     }
  }

  render() {
    console.log(this.props)
    const doodle = this.props.doodle
    const doodleData = JSON.stringify(doodle.doodle_data)
    // debugger
    // this.loadableCanvas.loadSaveData(doodleData)

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 grid-gap">
        <div className="doodle-card">
          <div class="fake-canvas">

            <CanvasDraw
              immediateLoading={true}
              disabled
              hideGrid
              // canvasWidth={315}
              // canvasHeight={350}
              // canvasWidth={500 }
              // canvasHeight={400}
              ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
              // saveData={doodle.doodle_data}
              saveData={JSON.stringify(this.props.doodle.doodle_data)}
              className="img-fluid disabled-canvas"
            />

        </div>
        <div className="like-title-container">
            <div>
              <p className="doodle-name">{doodle.name}</p>
                {this.renderButtons(doodleData)}
                {this.renderInfo()}
            </div>
                {/* <span>{doodle.likes.length}</span> */}
                <svg width="1em" height="1em" viewBox="0 0 16 16" onClick={this.handleLike} className={this.state.likeStatus ? "like align-middle bi bi-heart-fill" : "liked align-middle bi bi-heart-fill"} xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
        </div>
        </div>
      </div>
    )
  }
}

export default DoodleCard