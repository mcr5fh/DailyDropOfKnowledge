import React from "react";
import { connect } from "react-redux";
import { getQuestionsForReadable } from "../../readables/actions";
import { Link } from "react-router-dom";

// We want this to be a class because we want to call the reducer in
// componentDidMount
class QuestionList extends React.Component {
  state = { hasError: false };
  componentDidMount() {
    this.props.getQuestionsForReadable();
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  //He called it renderAdmin()
  renderQuestionOwnerButtons(questionData) {
    if (questionData.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/questions/edit/${questionData.id}`} className="ui button">
            Edit
          </Link>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  }

  renderList() {
    return this.props.questions.map((question) => {
      return (
        <div className="item" key={question.id}>
          {this.renderQuestionOwnerButtons(question)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {/* question title should be clickable; owner should have options to edit or delete their own questions */}
            {question.title}
            <div className="description">{question.description}</div>
          </div>
        </div>
      );
    });
  }

  //but only want this if user is signed in
  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/questions/new" className="ui button">
            Create Question
          </Link>
        </div>
      );
    }
  }
  render() {
    if (this.state.hasError) {
      return <div> Opps! </div>;
    }
    return (
      <div>
        <h2>Questions for {this.props.readable.title}</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
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
