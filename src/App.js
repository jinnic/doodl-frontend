import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import './App.css';

class App extends Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 12,
    doodle: {}
  };
  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    // window.setInterval(() => {
    //   this.setState({
    //     color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    //   });
    // }, 2000);
  }

  sendDoodleData = () => {
    let copiedDoodle = JSON.parse(this.state.doodle);
    copiedDoodle["user_id"] = 14
    copiedDoodle["name"] = "test"
    console.log(copiedDoodle)


    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
        body: JSON.stringify(copiedDoodle)
    }
    fetch('http://localhost:3000/doodles', config)
    .then(r => r.json())
    .then(console.log)
  }
  
  render() {
    return (
      <div>
          <p>Try it out! Draw something, hit "Save" and then "Load".</p>
          <div>
            <button onClick={this.sendDoodleData}>send data</button>
            <button
              onClick={() => {
                localStorage.setItem(
                  "savedDrawing",
                  this.saveableCanvas.getSaveData()
                );
                // console.log(this.saveableCanvas.getSaveData())
                this.setState({
                  doodle: this.saveableCanvas.getSaveData()
                })
              }}
            >
              Save
            </button>
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
          />
          <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              console.log(localStorage.getItem("savedDrawing"))
            );
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button>
        <CanvasDraw
          disabled
          hideGrid
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        />
      </div>
    );
  }
}
ReactDOM.render(<CanvasDraw />, document.getElementById("root"));
export default App;
