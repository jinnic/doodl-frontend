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
     return <span className="edit-delete"> 
      <button className="button" data-toggle="modal" data-target="#canvasModal" onClick={this.handleEdit}>edit</button>
      <button className="button" onClick={() => this.props.handleDelete(this.props.doodle.id)}>delete</button> 
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

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 grid-gap">
        <div className="doodle-card">
          <div class="fake-canvas">

            <CanvasDraw
            immediateLoading={true}
              disabled
              hideGrid
              canvasWidth={400}
              canvasHeight={400}
              ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
              saveData={doodleData}
              className="img-fluid disabled-canvas"
            />

        </div>
        <div className="like-title-container">
            <div>
              <p className="doodle-name">{doodle.name}</p>
                {this.renderButtons()}
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