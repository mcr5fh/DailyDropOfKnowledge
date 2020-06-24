// Import the React and ReactDOM libraries
import React, { Component } from "react";
import { Router, Route, Link, Switch } from "react-router-dom";

import QuestionCreate from "./questions/QuestionCreate";
import QuestionList from "./questions/QuestionList";
import {
  NEW_QUESTION_ROUTE_FORMAT,
  NEW_QUESTION_COMPONENT,
} from "./readables/routes/ReadableRoutes";

import ReadableCreate from "./readables/components/ReadableCreate";
import ReadableList from "./readables/components/ReadableList";
import ReadableDetails from "./readables/components/ReadableDetails";

import Header from "./Header";
import history from "../history";
import ReadableEdit from "./readables/components/ReadableEdit";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={ReadableList} />
          <Route path="/readables" exact component={ReadableList} />
          <Switch>
            <Route path="/readables/new" exact component={ReadableCreate} />
            <Route path="/readables/:id" exact component={ReadableDetails} />
            <Route path="/readables/edit/:id" exact component={ReadableEdit} />
          </Switch>

          {/* <Route path="/questions/edit/:id" exact component={QuestionEdit} /> */}
          <Route
            path={NEW_QUESTION_ROUTE_FORMAT}
            exact
            component={NEW_QUESTION_COMPONENT}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
