import React, { Component } from "react";
import { Button, Divider, Image, Transition } from "semantic-ui-react";

export default class ShowHide extends Component {
  state = { visible: true };

  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  render() {
    const { visible } = this.state;
    const hideText = "Hide " + this.props.content;
    const showText = "Show " + this.props.content;

    return (
      <div>
        <Transition visible={visible} animation="slide up" duration={200}>
          {this.props.component}
          {/* <Image size='small' src='https://react.semantic-ui.com/images/leaves/1.png' /> */}
        </Transition>
        <div className="right floated content">
          <Button
            content={visible ? hideText : showText}
            onClick={this.toggleVisibility}
          />
        </div>
      </div>
    );
  }
}
