import React, { Component } from "react";
import DrawingTool from "./DrawingTool";
import CanvasDraw from "react-canvas-draw";
import Modal from "react-bootstrap/Modal";
import { Popover, OverlayTrigger } from "react-bootstrap/";

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
      name: "masterpiece name",
    },
  };

  handleToolState = (type, value) => {
    console.log(type, value);
    switch (type) {
      case "name":
        this.setState({ tool: { ...this.state.tool, name: value } });
        break;
      case "brushRadius":
        this.setState({ tool: { ...this.state.tool, brushRadius: value } });
        break;
      case "color":
        this.setState({ tool: { ...this.state.tool, color: value } });
        break;
      case "random":
        this.setState({ tool: { ...this.state.tool, color: value } });
        break;
    }
  };

  handleSave = () => {
    //save doodle data from react-canvas-draw
    this.setState(
      {
        doodle: this.saveableCanvas.getSaveData(),
      },
      this.addOrUpdate
    );

    //clear canvas
    this.saveableCanvas.clear();
    this.props.onHide();
  };

  addOrUpdate = () => {
    let newObj = {};

    newObj.doodle_data = { ...JSON.parse(this.state.doodle) };
    newObj["user_id"] = this.props.user.id;
    newObj.name = this.state.tool.name;
    newObj.width = this.state.width;
    newObj.height = this.state.height;

    this.props.addNewDoodle(newObj);
    this.setState({
      name: "masterpiece name",
    });
  };

  render() {
    const { onHide, show } = this.props;
    const popover = (
      <Popover className="popover-basic">
        <Popover.Content>
          <button
            className="delete-button"
            onClick={() => this.saveableCanvas.clear()}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-trash-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
              />
            </svg>
          </button>
        </Popover.Content>
      </Popover>
    );
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
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
              <button className="button">clear</button>
            </OverlayTrigger>
            <button
              className="button undo"
              onClick={() => this.saveableCanvas.undo()}
            >
              undo
            </button>
          </section>
        </Modal.Header>
        <Modal.Body>
          <CanvasDraw
            className="doodle-canvas"
            hideGrid
            ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.tool.color}
            brushRadius={this.state.tool.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={500}
            canvasHeight={400}
          />
          <DrawingTool
            tool={this.state.tool}
            handleSave={this.handleSave}
            handleToolState={this.handleToolState}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewCanvas;
