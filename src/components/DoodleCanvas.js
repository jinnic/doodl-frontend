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
  // componentDidMount() {
  //   if(this.props.doodle){
  //     this.setState({
  //       name: this.props.doodle.name
  //     })
  //   }
  // }

  handleSave = () => {

    this.setState({
      doodle: this.saveableCanvas.getSaveData()
    }, this.addOrUpdate)

    //clear canvas
    this.saveableCanvas.clear()
  }

  addOrUpdate =()=>{
    let newObj = {}
    console.log("New Drawing PRops : ", this.props.user)
    newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
    newObj["user_id"] = this.props.user.id
    newObj.name = this.state.name
    newObj.width = this.state.width
    newObj.height = this.state.height
    // debugger

    if (Object.entries(this.props.doodle).length === 0){
      console.log("adding")
      this.props.emptyDoodleEdit()
      this.props.addNewDoodle(newObj)
      //** to redirect in the future : not working yet */
      // this.props.history.push(`/profile`)
    }else{
      console.log('edit this : ', this.props.doodle)
      this.props.emptyDoodleEdit()

      this.props.handleUpdate(newObj, this.props.doodleId)
     
      // this.props.closeCanvas()
    }
    
  }

  render() {
    console.log(this.props)
    return (
      <div>
          <div class="modal fade" id="canvasModal" tabindex="-1" role="dialog" aria-labelledby="#canvasModal" aria-hidden="true">
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
            saveData={this.props.doodle}
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


      // <div>
      //     <div>
      //       <button onClick={this.handleSave}> save and fetch</button>
            
      //       <button onClick={() => this.saveableCanvas.clear()}>
      //         Clear
      //       </button>

      //       <button onClick={() => this.saveableCanvas.undo()}>
      //         Undo
      //       </button>

      //       <button
      //         onClick={() => {
      //           this.setState({
      //             color: "#" + Math.floor(Math.random() * 16777215).toString(16)
      //           })
      //         }}
      //       >
      //         Random Color
      //       </button>

      //       <div>
      //         <label>Title:</label>
      //         <input
      //           type="text"
      //           value={this.state.name}
      //           onChange={e =>
      //             this.setState({name: e.target.value})
      //           }
      //         />
      //       </div>
            
      //       <div>
      //         <label>Brush-Radius:</label>
      //         <input
      //           type="number"
      //           value={this.state.brushRadius}
      //           onChange={e =>
      //             this.setState({ brushRadius: parseInt(e.target.value, 10) })
      //           }
      //         />
      //       </div>

      //     </div>
      //     <CanvasDraw
      //       ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
      //       brushColor={this.state.color}
      //       brushRadius={this.state.brushRadius}
      //       lazyRadius={this.state.lazyRadius}
      //       canvasWidth={this.state.width}
      //       immediateLoading={true}
      //       canvasHeight={this.state.height}
      //       saveData={this.props.doodle ? JSON.stringify(this.props.doodle.doodle_data) : ''}
      //     />
      // </div>
    )
  }

}

export default DoodleCanvas

  // sendDoodleData = () => {
  //   // let copiedDoodle = JSON.parse(this.state.doodle);

  //   let newObj = {}
  //   newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
  //   newObj["user_id"] = 1
  //   newObj.name = this.state.name
  //   newObj.width = this.state.width
  //   newObj.height = this.state.height


  //   console.log(newObj)
  //   const config = {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //   },
  //       body: JSON.stringify(newObj)
  //   }
  //   fetch('http://localhost:3000/doodles', config)
  //   .then(r => r.json())
  //   .then(newDoodle => this.props.addNewDoodle(newDoodle))
  // }

  // patchDoodleData=()=>{
  //   let newObj = {}
  //   newObj.doodle_data = { ...JSON.parse(this.state.doodle) }
  //   newObj["user_id"] = 1
  //   newObj.name = this.state.name
  //   newObj.width = this.state.width
  //   newObj.height = this.state.height


  //   console.log("**********", newObj)
  //   const config = {
  //     method: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //   },
  //       body: JSON.stringify(newObj)
  //   }
  //   // fetch(`http://localhost:3000/doodles/${this.props.doodle.id}`, config)
  //   // .then(r => r.json())
  //   // .then(newDoodle => this.props.addNewDoodle(newDoodle))
  // }