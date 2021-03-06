import React from "react";
import { connect } from "react-redux";
import { describeReadables } from "../actions";
import { Link } from "react-router-dom";
import { LoadingSegement } from "../../util/components/LoadingSegment";
// We want this to be a class because we want to call the reducer in
// componentDidMount
class ReadableList extends React.Component {
  state = { hasError: false };

  componentDidMount() {
    this.props.describeReadables();
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
  renderQuestionButtons(readableData) {
    //TODO Add these back
    // if (readableData.creatorId === this.props.currentUserId) {
    const ownerButtons = (
      <Link to={`/readables/edit/${readableData.id}`} className="ui button">
        Edit Readable
      </Link>
      // <button className="ui button negative">Delete (not hooked up)</button>
    );

    const doesUserOwnReadable =
      readableData.creatorId === this.props.currentUserId;
    return (
      <div className="right floated content">
        {doesUserOwnReadable && ownerButtons}

        {/* TODO: Move these links to constants or something */}
        <Link to={`/readables/${readableData.id}`} className="ui green button">
          View Questions
        </Link>
        {/* <button className="ui button negative">Delete</button> */}
      </div>
    );
    // }
  }

  renderList() {
    return this.props.readables
      .sort((r1, r2) => (r1.dateAdded > r2.dateAdded ? 1 : -1))
      .map((readable) => {
        return (
          <div className="item" key={readable.id}>
            {this.renderQuestionButtons(readable)}
            <i className="large middle aligned icon camera" />
            <div className="content">
              {/* readable title should be clickable; owner should have options to edit or delete their own readables */}
              {readable.title}
              <div className="description">{readable.description}</div>
              <div className="type" style={{ fontStyle: "italic" }}>
                {readable.type}
              </div>
              <div className="dateAdded">Created: {readable.dateAdded}</div>
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
          <Link to="/readables/new" className="ui button">
            Add Readable
          </Link>
        </div>
      );
    } else {
      console.log("Not signed, not rendering new readable button");
    }
  }

  render() {
    let content;
    if (this.state.hasError) {
      content = <div> Opps! This is awkward... Something went wrong :( </div>;
    } else if (!this.props.isSignedIn) {
      content = <div>Please sign in to see the Readables</div>;
    } else {
      content = this.props.readables ? (
        <div className="ui celled list">
          {this.renderList()}
          {this.renderCreateButton()}
        </div>
      ) : (
        <LoadingSegement />
      );
    }

    return (
      <div>
        <h2>Daily Readables</h2>
        {content}
      </div>
    );
  }
}

//this state is the redux state, and we are sending whatevr we want to the props
const mapStateToProps = (state) => {
  //to remove big dependency on lodash, change it to an array
  return {
    readables: Object.values(state.readablesData),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { describeReadables })(ReadableList);
