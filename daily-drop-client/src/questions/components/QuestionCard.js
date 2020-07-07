import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
// import { Grid } from "semantic-ui-react";

// import { getQuestionsForReadable } from "../../readables/actions";
import ShowHide from "../../util/components/ShowHide";

// We want this to be a class because we want to call the reducer in
// componentDidMount
class QuestionList extends React.Component {
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  state = { isVisible: false };

  toggleVisibility = () =>
    this.setState((prevState) => ({ isVisible: !prevState.isVisible }));

  renderQuestionOwnerButtons() {
    // if (questionData.userId === this.props.currentUserId) {
    return (
      <div className="right floated content">
        <Link
          to={`/questions/edit/${this.props.question.id}`}
          className="ui right floated button"
        >
          Edit
        </Link>
        <button className="ui button negative">Delete</button>
      </div>
    );
    // }
  }

  renderQuestionDetails() {
    const hideText = "Hide Answer";
    const showText = "Show Answer";
    const question = this.props.question;
    return (
      <div className="item" key={question.id}>
        {/* <Grid>// columns={3}
        <Grid>
          <Grid.Row>
            <Grid.Column> */}
        {/* <i className="ui large left aligned icon question circle outline" /> */}
        {/* </Grid.Column>
            <Grid.Column> */}
        <div className="ui content">
          <div className="chapter">{question.chapter}</div>
          {/* question title should be clickable; owner should have options to edit or delete their own questions */}
          <b>Question: {question.question}</b>
          <ShowHide
            component={<div className="answer">Answer: {question.answer}</div>}
            content="Answer"
            isVisible={this.state.isVisible}
          />
        </div>
        {/* </Grid.Column>
            <Grid.Column> */}
        {/* <div class="extra"> */}
        <div className="ui left floated content">
          {/* {this.renderQuestionOwnerButtons()} */}
          <Button
            content={this.state.isVisible ? hideText : showText}
            onClick={this.toggleVisibility}
          />
        </div>
        {/* </div> */}
        {/* </Grid.Column>
          </Grid.Row>
        </Grid> */}
      </div>
    );
  }

  render() {
    return this.renderQuestionDetails();
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

export default connect(mapStateToProps, {})(QuestionList);
