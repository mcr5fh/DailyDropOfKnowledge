import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const CLIENT_ID =
  "191430266122-liej0s4agtp0u31ljmjp5sgkpomre41d.apps.googleusercontent.com";

class GoogleAuth extends React.Component {
  componentDidMount() {
    //window helps show that gapi is included from our index.html
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          // key: "AIzaSyC_Rx__ELsqlQJvAVGTCsc2s5pGQCMdbm0",
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
    //I don't like this null check, but odd to say not signed
    if (this.props.isSignedIn === null) {
      //Had this wierd race condition where this was needed for a bit because this.auth
      //was not defined yet (from gapi). One solution (band-aid) was to check if
      //} || this.auth === undefined) {
      return null;
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
