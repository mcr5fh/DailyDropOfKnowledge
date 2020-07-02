import React, { Component } from "react";
import { Transition } from "semantic-ui-react";

export default class ShowHide extends Component {
  render() {
    return (
      <div className="ui">
        <Transition
          visible={this.props.isVisible}
          animation="slide up"
          duration={200}
        >
          {this.props.component}
          {/* <Image size='small' src='https://react.semantic-ui.com/images/leaves/1.png' /> */}
        </Transition>
      </div>
    );
  }
}
