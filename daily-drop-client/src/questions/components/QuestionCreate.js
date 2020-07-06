import React from "react";
import { connect } from "react-redux";
import { createQuestion } from "../actions/questionsActions";
import QuestionForm from "./QuestionForm";

//Need this to get the readable title
import { getReadable } from "../../actions/index";

class QuestionCreate extends React.Component {
  componentDidMount() {
    this.props.getReadable(this.props.readableId);
  }
  onSubmit = (formValues) => {
    //Redux form calls preventDefaultForYou
    // event.preventDefault();
    //OnSubmit gets called with the values in the form
    console.log("Submitting Create Question " + JSON.stringify(formValues));
    const questionAttributes = formValues;
    questionAttributes.readableId = this.props.readableId;

    this.props.createQuestion(questionAttributes);
    //After a user creates a stream, we will send them back to the stream list
    //via Programatic (as opposed to intentional (user) navigation) via the action creator
  };

  render() {
    if (!this.props.readable) {
      return <div>Loading...</div>;
    }
    console.log("mapStateToProps - ownProps: ", this.props);
    return (
      <div>
        <h3>Create a question for Readable: {this.props.readable.title}</h3>
        <QuestionForm onSubmitCallback={this.onSubmit} />
      </div>
    );
  }
}

//this state is the redux state, and we are sending whatevr we want to the props
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps - State: ", state);
  console.log("mapStateToProps - ownProps: ", ownProps);

  const readableId = ownProps.match.params.id;
  const readable = state.readablesData[readableId];
  return {
    readableId,
    readable,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(
  mapStateToProps, //map state to props
  { createQuestion, getReadable } //actionCreators
)(QuestionCreate);
