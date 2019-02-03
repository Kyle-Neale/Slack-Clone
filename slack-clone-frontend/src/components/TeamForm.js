import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import { Message, Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class TeamForm extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {

      }
    });
  }

  handleChange = (e) => {
    this[e.target.name] = e.target.value

  }

  handleSubmit = async () => {
    const { name } = this
    const response = await this.props.createTeam({
      variables: { name },

    });

    const { ok, errors } = response.data.createUser;

    if (ok) {
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
    const { name, errors: { nameError } } = this;
    const errorList = [];

    if (nameError) {
      errorList.push(nameError);
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
               Create A Team!
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} >
              <Segment stacked>
                <Form.Input fluid icon='user' name='name' iconPosition='left' placeholder='Name'
                  onChange={this.handleChange} value={name}
                  error={!!nameError}
                  />
                <Button color='teal' fluid size='large' >
                  Submit
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

export default observer(TeamForm);
