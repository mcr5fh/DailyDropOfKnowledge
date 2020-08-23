import React from "react";
import { connect } from "react-redux";
import QuestionForm from "./QuestionForm";
import { getQuestion, editQuestion } from "../../readables/actions";

//TODO: Make this a typescript file
class QuestionEdit extends React.Component {
  componentWillMount() {
    this.props.getQuestion(this.props.match.params.id);
  }

  /**
   * NOTE: We only want to push the values that are changing,
   * not the values like user id etx
   */
  onSubmit = (formValues) => {
    //Redux form calls preventDefaultForYou
    // event.preventDefault();
    //OnSubmit gets called with the values in the form
    console.log("Submitting Edit Form " + JSON.stringify(formValues));
    const questionId = this.props.question.id;
    this.props.editQuestion(questionId, formValues);
    //After a user creates a Question, we will send them back to the Question list
    //via history in the action
  };

  render() {
    if (!this.props.question) {
      return <div>Loading...</div>;
    }
    console.log("Edit Question: ", this.props.Question);

    return (
      <div>
        <h3>QuestionEdit: {this.props.question.question}</h3>
        <QuestionForm
          initialValues={question}
          onSubmitCallback={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const questionId = ownProps.match.params.id;
  const questionToEdit = state.questionsData[questionId];
  return { question: questionToEdit };
};

export default connect(
  mapStateToProps, //map state to props
  { getQuestion, editQuestion } //actionCreators
)(QuestionEdit);
