import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

class PostForm extends Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui red message">
          <label>{error}</label>
        </div>
      );
    }
  };

  renderInput = ({ label, input, meta }) => {
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input type="text" {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderDropdown = ({ label, input, meta, data, defaultValue }) => {
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <select {...input}>
          <option value="">{defaultValue}</option>
          {data.map((value, i) => (
            <option value={value} key={i}>
              {value}
            </option>
          ))}
        </select>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    const CategoryData = ['Programming', 'Technology', 'Other'];

    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title for Post"
        />

        <Field
          name="category"
          component={this.renderDropdown}
          label="Category"
          defaultValue="Select Category"
          data={CategoryData}
        />

        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui primary button">{this.props.actionName}</button>
        <Link
          to={this.props.dismiss}
          className="ui red button"
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </Link>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter title';
  }
  if (!formValues.category) {
    errors.category = 'Please select category';
  }
  if (!formValues.description) {
    errors.description = 'Please enter description';
  }
  return errors;
};

export default reduxForm({
  form: 'PostForm',
  validate
})(PostForm);
