import React, { Component } from 'react';
import { FormWrapper, TextInput, validations } from '../components';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loadProfileAction, saveProfileAction } from '../actions';
import { profileUpdate } from '../services';

class Profile extends Component {
  handleSubmit = values => {
    this.props.saveProfile(values);
  };

  componentDidMount() {
    this.props.loadProfile();
  }

  render() {
    const { initialValues } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} noValidate>
        {/* <pre>{JSON.stringify(initialValues)}</pre> */}
        <Field
          name="firstName"
          type="text"
          component={TextInput}
          label="First name"
          validate={[validations.required]}
        />
        <Field
          name="lastName"
          type="text"
          component={TextInput}
          label="Last name"
          validate={[validations.required]}
        />

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  // initialValues is a special property for redux-form initalisation
  initialValues: state.profile.data,
  error: state.profile.error
});

const mapDispatchToProps = dispatch => ({
  loadProfile() {
    dispatch(loadProfileAction());
  },
  saveProfile(values) {
    dispatch(saveProfileAction(values));
  }
});

Profile = reduxForm({
  form: 'profileForm',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(FormWrapper(Profile, 'Profile'));

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
