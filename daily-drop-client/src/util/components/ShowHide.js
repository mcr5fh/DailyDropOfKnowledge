import React, { Component } from "react";
import { Transition } from "semantic-ui-react";

export default class ShowHide extends Component {
  render() {
    return (
      <div className="ui">
        <Transition
          visible={this.props.isVisible}
          animation="fade left"
          duration={500}
        >
          {this.props.component}
        </Transition>
      </div>
    );
  }
}
