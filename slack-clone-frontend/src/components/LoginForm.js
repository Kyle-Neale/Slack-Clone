import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import { Message, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {

      }
    });
  }

  handleChange = (e) => {
    this[e.target.name] = e.target.value

  }

  handleSubmit = async () => {
    const { email, password } = this
    const response = await this.props.loginUser({
      variables: { email, password },

    });

    const { ok, token, refreshToken, errors } = response.data.loginUser;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      this.props.history.push('/');

    } else {
      const errs = {};
      errors.forEach(({ path, message }) => {
        errs[`${path}Error`] = message;
      });

      this.errors = errs;
    }
  }

  render() {
    const { email, password, errors: { emailError, passwordError } } = this;
    const errorList = [];

    if (passwordError) {
      errorList.push(passwordError);
    }
    if (emailError) {
      errorList.push(emailError);
    }

    return (
      <div className='login-form'>
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
               Login to your account!
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} >
              <Segment stacked>
                <Form.Input fluid icon='user' name='email' iconPosition='left' placeholder='E-mail'
                  onChange={this.handleChange} value={email}
                  error={!!emailError}
                  />
                <Form.Input
                  fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password'
                  onChange={this.handleChange} value={password}
                  error={!!passwordError}
                />
                <Button color='teal' fluid size='large' >
                  Login
                </Button>

                {(errorList.length) ?
                  (<Message>
                    <Message.Header>There were some errors with your submission!</Message.Header>
                    <Message.List items={errorList} />
                  </Message>) : null}
              </Segment>
            </Form>
            <Message>
              New to us? <a href='/register'>Signup</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
};

export default observer(LoginForm);
