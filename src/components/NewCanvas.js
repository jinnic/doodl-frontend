import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";


class NewCanvas extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 5,
    lazyRadius: 0,
    name: '',
    doodle: {}
  }

  //set title state when it's edit
//   componentDidMount() {
//     if(this.props.doodle){
//       this.setState({
//         name: this.props.doodle.name
//       })
//     }
//   }

  handleSave = () => {
    // debugger
    this.setState({
      doodle: this.saveableCanvas.getSaveData()
    }, this.addOrUpdate)

    //clear canvas
    this.saveableCanvas.clear()
    // this.setState({
    //   name: ''
    // })
  }

  addOrUpdate = () => {
    let newObj = {}
    
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = this.props.user.id
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height

    this.props.addNewDoodle(newObj)
  }

  render() {
    // console.log(this.state.name)
    return (
      <div>
          <div class="modal fade" id="newCanvasModal" tabindex="-1" role="dialog" aria-labelledby="#newCanvasModal" aria-hidden="true">
            <div class="modal-dialog " role="document">
              <div class="modal-content">
                <div class="modal-header">
                  {/* <section className="clear-undo-container"> */}
                    <button onClick={() => this.saveableCanvas.clear()}>
                      clear
                    </button>
                    <button onClick={() => this.saveableCanvas.undo()}>
                      undo
                    </button>
                  {/* </section> */}
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              <div class="modal-body"></div>
          <div>

          </div>
          <CanvasDraw
            className="doodle-canvas"
            hideGrid
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={400}
            canvasHeight={400}
            // saveData={''}
          />
          <div class="tool-container">
            <section class="tools">
              <label>title:</label>
              <input
                type="text"
                value={this.state.name}
                onChange={e =>
                  this.setState({name: e.target.value})
                }
              />
              <br></br>
              <label>brush radius:</label>
              <input
                className="brush-radius-input"
                type="number"
                value={this.state.brushRadius}
                onChange={e =>
                  this.setState({ brushRadius: parseInt(e.target.value, 10) })
                }
              />
              <label>brush color:</label>
              <input
                className="brush-color-input"
                type="color"
                value={this.state.color}
                onChange={e =>
                  this.setState({ color: e.target.value })
                }
              />
              <button
              className="random-button"
              onClick={() => {
                this.setState({
                  color: "#" + Math.floor(Math.random() * 16777215).toString(16)
                })
              }}
            >
              random
              </button>
              </section>
              <button className="save-button" onClick={this.handleSave} data-dismiss="modal">save</button>
          </div>
          </div>
          </div>
        </div>
      </div>
    )
  }

}

export default NewCanvas
