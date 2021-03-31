import React, { Component } from "react";
import DrawingTool from "./DrawingTool";
import CanvasDraw from "react-canvas-draw";
import Modal from "react-bootstrap/Modal";


class NewCanvas extends Component {
  state = {
    // color: "#672DAC",
    width: 500,
    height: 400,
    // brushRadius: 5,
    lazyRadius: 0,
    // name: 'masterpiece name',
    doodle: {},
    tool: {
      color: "#672DAC",
      brushRadius: 5,
      name: 'masterpiece name',
    }
  }

  handleToolState = (type, value) =>{
    console.log(type, value)
    switch(type){
      case "name":
        this.setState({tool:{ ...this.state.tool, name: value }});
        break;
      case "brushRadius":
        this.setState({tool:{ ...this.state.tool, brushRadius: value }});
        break;
      case "color":
        this.setState({tool:{ ...this.state.tool, color: value }});
        break;
      case "random":
        this.setState({tool:{ ...this.state.tool, color: value }});
        break;
    }

  }

  handleSave = () => {
    // debugger
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
    newObj.name = this.state.tool.name
    newObj.width = this.state.width
    newObj.height = this.state.height

    this.props.addNewDoodle(newObj)
    this.setState({
      name: 'masterpiece name'
    })
    
  }

  render() {
    const { onHide, show } = this.props
    return (

      <Modal
        show={show}
        onHide={onHide}
        scrollable={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="doodle-modal"
      >
        <Modal.Header closeButton className="">
          <section className="clear-undo">
            <button className="button" onClick={() => this.saveableCanvas.clear()}>
            clear
            </button>
            <button className="button undo" onClick={() => this.saveableCanvas.undo()}>
            undo
            </button>
          </section>
      </Modal.Header>
      <Modal.Body>
      <CanvasDraw
             className="doodle-canvas"
             hideGrid
             ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
             brushColor={this.state.tool.color}
             brushRadius={this.state.tool.brushRadius}
             lazyRadius={this.state.lazyRadius}
             canvasWidth={500}
             canvasHeight={400}
           />
      <DrawingTool tool={this.state.tool} handleSave={this.handleSave} handleToolState={this.handleToolState}/>
           {/* <div className="tool-container">
             <section className="tools">
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
                   color: this.randomColor()
                 })
               }}
             >
               random
               </button>
               </section>
               <button 
                className="save-button" 
                onClick={this.handleSave} 
                data-dismiss="modal"
              >
                save
              </button>
           </div> */}
      </Modal.Body>
      </Modal>
    )
  }

}

export default NewCanvas
