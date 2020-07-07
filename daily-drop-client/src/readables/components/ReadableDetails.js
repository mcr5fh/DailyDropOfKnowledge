import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { getQuestionsForReadable } from "../../questions/actions";

import { NewQuestionRoute } from "../routes/ReadableRoutes";
import QuestionCard from "../../questions/components/QuestionCard";
// import QuestionCard from "../../questions/components/QuestionCard";

// We want this to be a class because we want to call the reducer in
// componentDidMount
class ReadableDetails extends React.Component {
  getReadableId() {
    return this.props.readableId;
  }

  componentDidMount() {
    // this.props.getReadable(this.getReadableId());
    this.props.getQuestionsForReadable(this.getReadableId());
  }

  renderQuestions() {
    if (this.props.questions.length === 0) {
      return (
        <div>
          <h4>Add some questions!</h4>
        </div>
      );
    }
    return this.props.questions
      .sort((q1, q2) => (q1.dateAdded > q2.dateAdded ? 1 : -1))
      .map((question) => {
        return (
          // <div className="ui celled list">
          <QuestionCard question={question} key={question.id} />
          // </div>
          // <div className="item" key={question.id}>
          //   <i className="large middle aligned icon question circle outline" />
          //   <div className="content">
          //     <div className="chapter">{question.chapter}</div>
          //     {/* question title should be clickable; owner should have options to edit or delete their own questions */}
          //     <b>Question: {question.question}</b>
          //     <div className="answer">Answer: {question.answer}</div>
          //   </div>
          // </div>
        );
      });
  }

  //but only want this if user is signed in
  renderNewQuestionButton() {
    const newQuestionRoute = new NewQuestionRoute(
      this.getReadableId(),
      this.props.readable.name
    );
    if (
      this.props.isSignedIn &&
      this.props.currentUserId === this.props.readable.creatorId
    ) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to={newQuestionRoute.routePath} className="ui green button">
            Add new question
          </Link>
        </div>
      );
    } else {
      console.log(
        "Not rendering create button because user is not signed in or user does not own this readable"
      );
    }
  }

  render() {
    if (!this.props.readable) {
      return <div>Loading...</div>;
    }
    if (!this.props.questions) {
      return <div>Loading Questions...</div>;
    }

    return (
      <div>
        <h2>Readables</h2>
        <h3>
          {_.startCase(this.props.readable.type)}: {this.props.readable.title}
        </h3>
        {/* <div className="ui items"> */}
        <div className="ui celled list">{this.renderQuestions()}</div>
        {this.renderNewQuestionButton()}
      </div>
    );
  }
}

//this state is the redux state, and we are sending whatevr we want to the props
const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps - State: ", state);
  console.log("mapStateToProps - ownProps: ", ownProps);
  const readableId = ownProps.match.params.id;
  const readableToShow = state.questionsData.curReadable;

  return {
    readableId,
    readable: readableToShow,
    questions: state.questionsData.curQuestions,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  getQuestionsForReadable,
})(ReadableDetails);
