import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const CLIENT_ID =
  "XXXX";

class GoogleAuth extends React.Component {
  componentDidMount() {
    //window helps show that gapi is included from our index.html
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          //invoked any time the auth status changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    isSignedIn
      ? this.props.signIn(this.auth.currentUser.get().getId())
      : this.props.signOut();
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderSignInButton = () => {
    return (
      <button className="ui green google button" onClick={this.onSignIn}>
        <i className="google icon" />
        Sign In
      </button>
    );
  };

  renderSignOutButton = () => {
    return (
      <button className="ui red google button" onClick={this.onSignOut}>
        <i className="google icon" />
        Sign Out
      </button>
    );
  };

  renderAuthButton() {
    //I don't like this null check, but odd to say not signed if we don't know yet
    if (this.props.isSignedIn === null) {
      return <div>Loading..</div>;
    } else if (this.props.isSignedIn) {
      return this.renderSignOutButton();
    } else {
      return this.renderSignInButton();
    }
  }

  render() {
    return <div>Google Auth: {this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
