import React from "react";
import { connect } from "react-redux";
import { createReadable } from "../../actions";
import ReadableForm from "./ReadableForm";

class ReadableCreate extends React.Component {
  onSubmit = (formValues) => {
    //Redux form calls preventDefaultForYou
    // event.preventDefault();
    //OnSubmit gets called with the values in the form
    console.log("Submitting Create Readable " + JSON.stringify(formValues));

    this.props.createReadable(formValues);
    //After a user creates a readable, we will send them back to the readable list
    //via Programatic (as opposed to intentional (user) navigation) via the action creator
  };

  render() {
    return (
      <div>
        <h3>Add a new Readable!</h3>
        <ReadableForm onSubmitCallback={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null, //map state to props
  { createReadable } //actionCreators
)(ReadableCreate);
