import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";



class DoodleCanvas extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    name: '',
    doodle: {}
  };

  sendDoodleData = () => {
    // let copiedDoodle = JSON.parse(this.state.doodle);

    let newObj = {}
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = 1
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height


    console.log(newObj)
    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
        body: JSON.stringify(newObj)
    }
    fetch('http://localhost:3000/doodles', config)
    .then(r => r.json())
    .then(newDoodle => this.props.addNewDoodle(newDoodle))
  }

  patchDoodleData=()=>{
    let newObj = {}
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = 1
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height


    console.log("**********", newObj)
    const config = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
        body: JSON.stringify(newObj)
    }
    // fetch(`http://localhost:3000/doodles/${this.props.doodle.id}`, config)
    // .then(r => r.json())
    // .then(newDoodle => this.props.addNewDoodle(newDoodle))
  }

  handleSave=()=>{
    //save it to doodle state
    //update new doodle in backend
    //and send it back to DoodleContainer with 
    //new returned obj
    this.setState({
      doodle: this.saveableCanvas.getSaveData()
      }
    )

    // if(this.props.closeCanvas){
    //   this.props.closeCanvas()
    //   this.setState({
    //     doodle: this.saveableCanvas.getSaveData()
    //     }, 
    //     ()=> this.patchDoodleData()
    //   )

    // }else{
    //   this.setState({
    //     doodle: this.saveableCanvas.getSaveData()
    //     }, 
    //     ()=> this.sendDoodleData()
    //   )
    // }

    //clear canvas
    this.saveableCanvas.clear()
  }

  render() {
    console.log("++++++**********",this.state.doodle)
    return (
      <div>
        <p>Try it out! Draw something, hit "Save" and then "Load".</p>
          <div>
            <button onClick={this.handleSave}> save and fetch</button>
            {/* <button onClick={this.sendDoodleData}>
              send data
            </button>
            <button
              onClick={() => {
                //localStorate.setItem('key', )
                //getSaveData() returns the drawing's save-data as a stringified object
                localStorage.setItem(
                  "savedDrawing",
                  this.saveableCanvas.getSaveData()
                );

                this.setState({
                  doodle: this.saveableCanvas.getSaveData()
                }, ()=>console.log('save button clicked set doodle state: ', this.state.doodle))
              }}
            >
              Save
            </button> */}
            
            <button
              onClick={() => {
                this.saveableCanvas.clear();
              }}
            >
              Clear
            </button>
            <button
              onClick={() => {
                this.saveableCanvas.undo();
              }}
            >
              Undo
            </button>
            <button
              onClick={() => {
                this.setState({
                  color: "#" + Math.floor(Math.random() * 16777215).toString(16)
                })
              }}
            >
              Random Color
            </button>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={this.state.name}
                onChange={e =>
                  this.setState({ name: e.target.value},()=>console.log(this.state.name))
                }
              />
            </div>
            <div>
              <label>Width:</label>
              <input
                type="number"
                value={this.state.width}
                onChange={e =>
                  this.setState({ width: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Height:</label>
              <input
                type="number"
                value={this.state.height}
                onChange={e =>
                  this.setState({ height: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Brush-Radius:</label>
              <input
                type="number"
                value={this.state.brushRadius}
                onChange={e =>
                  this.setState({ brushRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
            <div>
              <label>Lazy-Radius:</label>
              <input
                type="number"
                value={this.state.lazyRadius}
                onChange={e =>
                  this.setState({ lazyRadius: parseInt(e.target.value, 10) })
                }
              />
            </div>
          </div>
          <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
            saveData={this.props.doodle ? JSON.stringify(this.props.doodle.doodle_data) : ''}
          />
      </div>
    )
  }

}

export default DoodleCanvas