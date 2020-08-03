import React, { Component } from "react";

export default class Handle extends Component {
  state = {
    showMoveMeHint: false,
  };

  mouseOverPlotTitleHandler = () => {
    this.setState({ showMoveMeHint: true });
  };

  mouseOutOfPlotTitleHandler = () => {
    this.setState({ showMoveMeHint: false });
  };

  render = () => {
    return (
      <div className="row">
        <div
          className="handle col-12"
          onMouseOver={this.mouseOverPlotTitleHandler}
          onMouseOut={this.mouseOutOfPlotTitleHandler}
        >
          {this.state.showMoveMeHint ? "Move Me" : this.props.title}
        </div>
      </div>
    );
  };
}
