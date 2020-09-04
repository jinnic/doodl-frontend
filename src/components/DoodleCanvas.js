import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";


class DoodleCanvas extends Component {
  state = {
    color: "#672DAC",
    width: 500,
    height: 400,
    brushRadius: 5,
    lazyRadius: 0,
    name: this.props.doodle.name,
    doodle: {}
  }



  handleSave = () => {
    // debugger
    this.setState({
      doodle: this.saveableCanvas.getSaveData()
    }, this.updateDrawing)

    this.saveableCanvas.clear()
  }

  componentDidUpdate(prevProps) {

    if (this.props.doodle !== prevProps.doodle) {
      this.setState({
        name: this.props.doodle.name
      })
    }
  }

  updateDrawing = () => {
    let newObj = {}
    
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = this.props.user.id
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height

    this.props.handleUpdate(newObj, this.props.doodle.id)
  }

  render() {
    return (
      <div>
          <div class="doodle-modal modal fade" id="canvasModal" tabindex="-1" role="dialog" aria-labelledby="#canvasModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
              <div class="modal-header">
                    <section className="clear-undo">
                        <button className="button" onClick={() => this.saveableCanvas.clear()}>
                        clear
                        </button>
                        <button className="button undo" onClick={() => this.saveableCanvas.undo()}>
                        undo
                        </button>
                    </section>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
            canvasWidth={500}
            canvasHeight={400}
            saveData={JSON.stringify(this.props.doodle.doodle_data)}
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
              <label>brush:</label>
              <input
                className="brush-radius-input"
                type="number"
                value={this.state.brushRadius}
                onChange={e =>
                  this.setState({ brushRadius: parseInt(e.target.value, 10) })
                }
              />
              <label>color:</label>
              <input
                className="brush-color-input align-middle"
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

export default DoodleCanvas
