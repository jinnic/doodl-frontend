import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";



class Doodle extends Component {

  // getDoodleData =()=>{
  //   return fetch('http://localhost:3000/doodles')
  //     .then(r=>r.json())
  //     .then(doodles => this.renderDoodle(JSON.stringify(doodles[3].doodle_data)))

  // }
  
  // renderDoodle=(doodle)=>{
  //   this.loadableCanvas.loadSaveData(doodle)
  // }
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
      

      // debugger
  }
  render() {
    //console.log("Doodle props : ", this.props)
   
    return (
      <div onClick={this.handleClick}>
        {/* <button
          onClick={() => {
            console.log(this)
            //fetch particular doodle data with ID and render
            this.getDoodleData()
            //this : Doodle class

            //loadSaveData(saveData: String, immediate: Boolean) loads a previously saved drawing
            //using the saveData string, as well as an optional boolean flag to load it immediately,
            //instead of live-drawing it. 
            // this.loadableCanvas.loadSaveData(
            //   // this.getDoodleData()
            //   // localStorage.getItem("savedDrawing")
            // )

            //console.log('this.getDoodleData()=> ', this.getDoodleData())
            //console.log('localStorage.getItem("savedDrawing")=> ',localStorage.getItem("savedDrawing"))

            //localStorage.getItem('key you set with setItem() function') is a JS function that gets item
            //set by localStorage.setItem('key', value) 
            //ref : https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
            //getItem returns 'String'
            //localStorage.getItem("savedDrawing")
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button> */}

        {/* you can hideGrid or disabled for editting */}
        <CanvasDraw
          disabled
          hideGrid
          canvasWidth={this.props.width}
          canvasHeight={this.props.height}
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={this.props.doodle}
          
        />
      </div>
    )
  }

}

export default Doodle