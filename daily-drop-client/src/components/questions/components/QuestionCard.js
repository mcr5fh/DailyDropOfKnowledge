import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getQuestionsForReadable } from "../../../actions";
import ShowHide from "../../general/ShowHide";

// We want this to be a class because we want to call the reducer in
// componentDidMount
class QuestionList extends React.Component {
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  renderQuestionOwnerButtons() {
    // if (questionData.userId === this.props.currentUserId) {
    return (
      <div className="right floated content">
        <Link
          to={`/questions/edit/${this.props.question.id}`}
          className="ui button"
        >
          Edit
        </Link>
        <button className="ui button negative">Delete</button>
      </div>
    );
    // }
  }

  renderQuestionDetails() {
    return (
      <div className="item" key={this.props.question.id}>
        <i className="large middle aligned icon question circle outline" />
        <div className="middle aligned content">
          <div className="chapter">{this.props.question.chapter}</div>
          {/* question title should be clickable; owner should have options to edit or delete their own questions */}
          <b>Question: {this.props.question.question}</b>
        </div>
        <ShowHide
          component={
            <div className="answer">Answer: {this.props.question.answer}</div>
          }
          content="Answer"
        />
        {/* {this.renderQuestionOwnerButtons()} */}
      </div>
    );
  }

  render() {
    return <div>{this.renderQuestionDetails()}</div>;
  }
}

//this state is the redux state, and we are sending whatevr we want to the props
const mapStateToProps = (state) => {
  //to remove big dependency on lodash, change it to an array
  return {
    questions: state.curQuestions,
    readable: state.curReadable,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { getQuestionsForReadable })(
  QuestionList
);
