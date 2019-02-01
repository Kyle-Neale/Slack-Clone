import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import { Message, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export default observer(class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
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

    const { ok, token, refreshToken } = response.data.loginUser;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

    }
  }

  render() {
    const { email, password } = this
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
               Login to your account!
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} >
              <Segment stacked>
                <Form.Input fluid icon='user' name='email' iconPosition='left' placeholder='E-mail'
                  onChange={this.handleChange} value={email}
                  />
                <Form.Input
                  fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password'
                  onChange={this.handleChange} value={password}
                />
                <Button color='teal' fluid size='large' >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
});
