import React, { Component } from 'react';
import { Message, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export default class RegisterForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',

    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async () => {

    this.setState({
      usernameError: '',
      passwordError: '',
      emailError: '',
    });

    const response = await this.props.registerUser({
      variables: {...this.state}
    });

    const { ok, errors } = response.data.registerUser;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({path, message}) => {
        err[`${path}Error`] = message
      });

      this.setState(err);
    }
    console.log(response)
  }

  render() {
    const { usernameError, passwordError, emailError } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    if (emailError) {
      errorList.push(emailError);
    }


    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
               Sign up for an account!
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} >
              <Segment stacked>
                <Form.Input error={!!usernameError} fluid icon='user' name='username' iconPosition='left' placeholder='Username'
                  onChange={this.handleChange}
                  />
                <Form.Input  error={!!emailError} fluid icon='user' name='email' iconPosition='left' placeholder='E-mail'
                  onChange={this.handleChange}
                  />
                <Form.Input
                  error={!!passwordError} fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large' >
                  Sign Up!
                </Button>
                {(usernameError || emailError || passwordError) ?
                  (<Message>
                    <Message.Header>There were some errors with your submission!</Message.Header>
                    <Message.List items={errorList} />
                  </Message>) : null}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
