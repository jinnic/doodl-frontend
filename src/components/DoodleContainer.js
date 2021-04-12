import React, { Component } from "react";
import DoodleCard from "./DoodleCard";

class DoodleContainer extends Component {
  state = {
    editable: false,
    doodle: {},
  };

  renderDoodle = () => {
    return this.props.doodles.slice(0, 6).map((doodle) => (
      <DoodleCard
        key={doodle.id}
        renderExisting={this.props.renderExisting}
        showEditCanvas={this.showEditCanvas}
        handleUpdate={this.props.handleUpdate}
        handleDelete={this.props.handleDelete}
        match={this.props.match}
        page={this.props.page}
        doodle={doodle}
        updateLike={this.props.updateLike}
        user={this.props.user}
        handleEditCanvasShow={this.props.handleEditCanvasShow}
      />
    ));
  };

  render() {
    return (
      <div className="">
        <div className="flex-container">{this.renderDoodle()}</div>
      </div>
    );
  }
}
export default DoodleContainer;
