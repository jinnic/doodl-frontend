import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { Popover, OverlayTrigger } from 'react-bootstrap/'



class DoodleCard extends Component {

  state = {
    likeStatus: "",
    width: 400,
    height: 400
  }

  componentDidMount() {
    //filter like by current user
    //set likeStatus by filter
    const doodle = this.props.doodle
    const like = doodle.likes.filter(like => like.user_id === this.props.user.id)
    this.setState({
      likeStatus: like.length > 0 ? true : false
    })
    window.addEventListener('resize', this.onResize);
    this.responsiveDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (event) => {
    this.responsiveDimensions()

  }

  responsiveDimensions = () => {
    if(window.innerWidth < 576) {
        this.setState({
            height: 300,
            width: 300,
        })
        this.saveableCanvas.loadSaveData(
            JSON.stringify(this.props.doodle.doodle_data))
    }
    if(window.innerWidth > 576 && window.innerWidth < 786) {
        this.setState({
            height: 250,
            width: 250,
        })
        this.saveableCanvas.loadSaveData(
            JSON.stringify(this.props.doodle.doodle_data))
    }
    if(window.innerWidth > 768 && window.innerWidth < 992) {
        this.setState({
            height: 300,
            width: 300,
        })
        this.saveableCanvas.loadSaveData(
            JSON.stringify(this.props.doodle.doodle_data))
    }
    if(window.innerWidth > 992 && window.innerWidth < 1200) {
        //my laptop
        this.setState({
            height: 400,
            width: 400,
        })
        this.saveableCanvas.loadSaveData(
            JSON.stringify(this.props.doodle.doodle_data))
    }
    if(window.innerWidth > 1200) {
        this.setState({
            height: 400,
            width: 400,
        })
        this.saveableCanvas.loadSaveData(
            JSON.stringify(this.props.doodle.doodle_data))
    }
  }



  handleLike = () => {
    this.setState(prevState => ({
      likeStatus: !prevState.likeStatus
    }))
    this.props.updateLike(this.props.doodle.id)
  }

  handleClick = (e) => {
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

  renderButtons = () => {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Content>
          <button className="delete-button" onClick={() => this.props.handleDelete(this.props.doodle.id)}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
          </button>
        </Popover.Content>
      </Popover>
    )

    if (this.props.match && this.props.match.url === "/profile") {
     return <span className="edit-delete"> 
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
        <button className="button">delete</button> 
      </OverlayTrigger>
      <button className="button" data-toggle="modal" data-target="#canvasModal" onClick={this.handleEdit}>edit</button>
      <svg onClick={this.handleClick} width="1.3em" height="1.3em" viewBox="0 0 16 16" className="align-bottom bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
        <path fill-rule="evenodd" d="M5 7.5a.5.5 0 0 1 .707 0L8 9.793 10.293 7.5a.5.5 0 1 1 .707.707l-2.646 2.647a.5.5 0 0 1-.708 0L5 8.207A.5.5 0 0 1 5 7.5z"/>
        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 1z"/>
      </svg>
     </span>
    }
  }

  renderInfo = () => {
    const doodle = this.props.doodle
    if (!this.props.match) {
      return (
          <p className="created-by">created by {doodle.username}</p>
      )
     }
  }

  render() {
<<<<<<< HEAD
    console.log(this.props.user)
=======
   
>>>>>>> 584c50dbd85b9c53a51f164f9c1444ef9d027e1f
    const doodle = this.props.doodle
    const doodleData = JSON.stringify(doodle.doodle_data)
    console.log("likes ; ",doodle.likes)
    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 grid-gap">
        <div className="doodle-card">
          <div className="fake-canvas">

            <CanvasDraw
              immediateLoading={true}
              disabled
              hideGrid
              canvasWidth={this.state.width}
              canvasHeight={this.state.height}
              ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
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
            <div className="like">
              <span>{doodle.likes.length} </span>
              <svg width="1em" height="1em" viewBox="0 0 16 16" onClick={this.handleLike} className={this.state.likeStatus ? "like align-middle bi bi-heart-fill" : "liked align-middle bi bi-heart-fill"} xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default DoodleCard