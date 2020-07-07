import React from "react";
import { Field, reduxForm } from "redux-form";

class ReadableForm extends React.Component {
  renderError({ error }) {
    return <div className="ui error message">{error}</div>;
  }
  //input has all of the methods needed to hook up to redux-form
  //meta holds the error data
  renderFormInput = ({ input, label, meta }) => {
    console.log(meta);
    const shouldShowError = meta.error && meta.touched;
    const divClassName = `field ${shouldShowError ? "error" : ""}`;
    return (
      <div className={divClassName}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {shouldShowError ? this.renderError(meta) : ""}
      </div>
    );
  };

  renderFormFields() {
    console.log("renderFormFields ", this.props.initialValues);
    //TODO: Don't show user id or question id
    return Object.keys(this.props.initialValues).map((key) => (
      <Field
        name={key}
        component={this.renderFormInput}
        label={`Enter ${key}`}
      />
    ));
  }

  onSubmit = (formValues) => {
    //Redux form calls preventDefaultForYou
    // event.preventDefault();
    //OnSubmit gets called with the values in the form
    console.log("Submitting Create Form " + JSON.stringify(formValues));
    this.props.onSubmitCallback(formValues);
    //After a user creates a readable, we will send them back to the readable list
    //via Programatic (as opposed to intentional (user) navigation) via the action creator
  };

  render() {
    return (
      <div>
        ReadableForm
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          {/* {this.renderFormFields()} */}
          <Field
            name="title"
            component={this.renderFormInput}
            label="Enter Title"
          />
          <Field
            name="description"
            component={this.renderFormInput}
            label="Enter Description"
          />
          <Field
            name="type"
            component={this.renderFormInput}
            label="Enter Content Type (book, podcast, etc)"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

/**
 * Returning an empty object means that the input is valid,
 * the error messages returned are shown on the form.
 *
 * The error values key must match the field name exactly
 */
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

//WrappedForm
export default reduxForm({
  form: "ReadableForm",
  validate,
})(ReadableForm);
