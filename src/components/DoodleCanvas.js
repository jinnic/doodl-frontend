import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";


class DoodleCanvas extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 0,
    name: '',
    doodle: {}
  }

  //set title state when it's edit
  componentDidMount() {
    if(this.props.doodle){
      this.setState({
        name: this.props.doodle.name
      })
    }
  }

  handleSave = () => {

    this.setState({
      doodle: this.saveableCanvas.getSaveData()
    }, this.addOrUpdate)

    //clear canvas
    this.saveableCanvas.clear()
  }

  addOrUpdate = () => {
    let newObj = {}
    
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = this.props.user.id
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height

    if (this.props.addNewDoodle) {
      this.props.addNewDoodle(newObj)
    } else {
      
      this.props.handleUpdate(newObj, this.props.doodle.id)
      this.props.closeCanvas()
    }
    
  }

  render() {
    console.log(this.props.user)
    return (
      <div class="modal fade" id="canvasModal" tabindex="-1" role="dialog" aria-labelledby="canvasModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title " id="canvasModalLabel">{!this.state.toggle ? 'Welcome to Doodl' : 'Welcome Back'}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">


                      <div>
                        <button onClick={this.handleSave}> save and fetch</button>
                        
                        <button onClick={() => this.saveableCanvas.clear()}>
                          Clear
                        </button>

                        <button onClick={() => this.saveableCanvas.undo()}>
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
                              this.setState({name: e.target.value})
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
                  </div>
                </div>
        </div>    
    )
  }

}

export default DoodleCanvas
