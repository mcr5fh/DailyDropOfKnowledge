import React from "react";
import { connect } from "react-redux";
import ReadableForm from "./ReadableForm";
import { getReadable, editReadable } from "../../../actions";

//TODO: Make this a typescript file
// import { DefaultReadable } from "../model/ReadableModel";

class ReadableEdit extends React.Component {
  componentWillMount() {
    this.props.getReadable(this.props.match.params.id);
  }

  /**
   * NOTE: We only want to push the values that are changing,
   * not the values like user id etx
   */
  onSubmit = (formValues) => {
    //Redux form calls preventDefaultForYou
    // event.preventDefault();
    //OnSubmit gets called with the values in the form
    console.log("Submitting Create Form " + JSON.stringify(formValues));
    const readableId = this.props.readable.id;
    this.props.editReadable(readableId, formValues);
    //After a user creates a readable, we will send them back to the readable list
    //via Programatic (as opposed to intentional (user) navigation) via the action creator
  };

  render() {
    if (!this.props.readable) {
      return <div>Loading...</div>;
    }
    console.log("Edit readable: ", this.props.readable);

    return (
      <div>
        <h3>ReadableEdit</h3>
        <ReadableForm
          initialValues={this.props.readable}
          onSubmitCallback={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const readableId = ownProps.match.params.id;
  const readableToEdit = state.readablesData[readableId];
  return { readable: readableToEdit };
};

export default connect(
  mapStateToProps, //map state to props
  { getReadable, editReadable } //actionCreators
)(ReadableEdit);
